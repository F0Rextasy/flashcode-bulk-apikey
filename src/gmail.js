'use strict';

/**
 * Gmail mailboxes from Emailnator (the fleet's Emailnator client in
 * `providers/cloudflare-wai/emailnator.js`), wrapped with exit rotation and the
 * pacing the fleet measured (Emailnator 429s under load → 6 s between calls,
 * 30 s backoff on failure).
 *
 * Why: several panels here enforce an e-mail **domain whitelist** and accept
 * only qq/gmail; Mailtrap/inboxes domains are refused server-side
 * (measured: 快跑API "email domain name whitelist", AIAIAI "仅支持 QQ 邮箱和 Gmail 邮箱").
 *
 * `plain` (dots stripped) is the form the panel must be given; Emailnator's own
 * message API is keyed by the dotted form.
 */

const path = require('path');
const { sleep, isExitError } = require('./lib');

let emailnator = null;
try {
  emailnator = require('./emailnator');
} catch (e) {
  /* reported on first use */
}

let lastCall = 0;
let lock = Promise.resolve();

/** Serialized + paced access to Emailnator (it rate-limits by habit). */
function gate(fn) {
  const run = lock.then(async () => {
    const gap = 6000 - (Date.now() - lastCall);
    if (gap > 0) await sleep(gap);
    try {
      return await fn();
    } finally {
      lastCall = Date.now();
    }
  });
  lock = run.catch(() => {});
  return run;
}

async function withRetry(label, fn, { tries = 5 } = {}) {
  let last = null;
  for (let i = 0; i < tries; i++) {
    try {
      return await gate(fn);
    } catch (e) {
      last = e;
      const msg = String(e.message || e);
      if (/429|rate|too many/i.test(msg)) await sleep(20000 + i * 15000);
      else await sleep(3000 + i * 4000);
    }
  }
  throw new Error(`${label}: ${String(last && last.message).slice(0, 160)}`);
}

// `LiveSupply.next()` preflights the exit and is async; awaiting here keeps both
// pool shapes working (a sync ExitPool just resolves immediately).
async function pickExit(pool) {
  return pool ? await pool.next() : null;
}

/** Fresh gmail box; returns {plain, dotted, exit}. */
async function newGmail(pool, { tries = 6 } = {}) {
  if (!emailnator) throw new Error('emailnator module missing');
  let lastErr = null;
  for (let i = 0; i < tries; i++) {
    const exit = await pickExit(pool);
    try {
      const box = await withRetry('emailnator generate', () => emailnator.newAddress(exit), { tries: 3 });
      if (pool && pool.alive) pool.alive(exit);
      return { plain: box.plain, dotted: box.dotted, exit: exit && exit.line, provider: 'emailnator' };
    } catch (e) {
      lastErr = e;
      if (exit) pool.kill(exit);
    }
  }
  throw lastErr;
}

async function list(plain, pool, { tries = 5 } = {}) {
  for (let i = 0; i < tries; i++) {
    const exit = await pickExit(pool);
    try {
      const messages = await withRetry('emailnator list', () => emailnator.listMessages(plain, exit), { tries: 3 });
      if (pool && pool.alive) pool.alive(exit);
      return { messages, exit: exit && exit.line };
    } catch (e) {
      if (exit) pool.kill(exit);
      if (i === tries - 1) throw e;
    }
  }
  return { messages: [] };
}

async function read(id, pool, { tries = 4 } = {}) {
  for (let i = 0; i < tries; i++) {
    const exit = await pickExit(pool);
    try {
      const full = await withRetry('emailnator read', () => emailnator.readMessage(id, exit), { tries: 3 });
      if (pool && pool.alive) pool.alive(exit);
      return full;
    } catch (e) {
      if (exit) pool.kill(exit);
      if (i === tries - 1) throw e;
    }
  }
  return {};
}

const flat = (h) => String(h || '').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
/** Polls until `extract(text)` matches; text = subject + readable body. */
const msgId = (m) => String((m && (m.message_id || m.id)) || '');

/**
 * Ids already in the box, taken BEFORE the code is requested. These are *shared*
 * public mailboxes: a recycled address is full of other tenants' mail, and a
 * code that was already there when we asked is somebody else's (measured: a
 * stale code submitted this way answered `Verification code is incorrect or has
 * expired`). A failed snapshot is not an empty box — it throws.
 */
async function snapshot(plain, pool, { tries = 5, gapMs = 4000 } = {}) {
  let last = null;
  for (let i = 0; i < tries; i++) {
    try {
      const { messages } = await list(plain, pool, { tries: 2 });
      return new Set((messages || []).map(msgId).filter(Boolean));
    } catch (e) { last = e; await sleep(gapMs); }
  }
  throw new Error(`emailnator snapshot failed after ${tries} tries: ${String((last && last.message) || last).slice(0, 120)}`);
}

/**
 * Polls until a *fresh* mail that matches `extract` arrives.
 *
 * `baseline` (or its alias `since`) is REQUIRED — the box is shared, so "any
 * mail with digits" once submitted another service's code. Nothing present in
 * the baseline is ever read. `brand` narrows further: when given, only a mail
 * whose sender/subject names this panel may supply a code.
 */
async function waitCode(plain, pool, extract, { baseline = null, since = null, brand = null, timeoutMs = 240000, pollMs = 8000 } = {}) {
  if (baseline == null && since == null) {
    throw new Error('gmail.waitCode: baseline required — a pre-send snapshot is the only fence for a shared emailnator box');
  }
  const fence = baseline instanceof Set ? new Set([...baseline].map(String)) : new Set([...(baseline || since)].map(String));
  const brandRe = brand ? (brand instanceof RegExp ? brand : new RegExp(brand, 'i')) : null;
  const t0 = Date.now();
  const seen = new Set();
  while (Date.now() - t0 < timeoutMs) {
    let messages = [];
    try {
      messages = (await list(plain, pool)).messages;
    } catch (e) {
      await sleep(pollMs);
      continue;
    }
    for (const m of messages) {
      const id = String(m.message_id || m.id || '');
      const subject = m.subject || '';
      if (!id || seen.has(id) || fence.has(id)) continue;
      seen.add(id);
      if (brandRe && !brandRe.test(`${m.from || ''} ${subject}`)) continue;
      let text = subject;
      try {
        const full = await read(id, pool);
        // Emailnator answers with the body in `content` (HTML); `text`/`html` are
        // other backends' names — read all three.
        text = `${subject}\n${full.text || ''}\n${flat(full.content || full.html || '')}`;
      } catch (e) {
        /* subject-only */
      }
      // `extract` may be a function or a RegExp (the browser-generic mint passes its link
      // pattern through); calling a RegExp threw `extract is not a function`.
      const code = typeof extract === 'function' ? extract(text) : (String(text).match(extract) || [])[0];
      if (code) return { code, subject, id, text: text.slice(0, 4000), elapsed: Date.now() - t0 };
    }
    await sleep(pollMs);
  }
  return null;
}

module.exports = { newGmail, list, read, waitCode, snapshot, msgId };
