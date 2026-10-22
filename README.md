<div align="center">

```
███████╗██╗      █████╗ ███████╗██╗  ██╗ ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██║     ██╔══██╗██╔════╝██║  ██║██╔════╝██╔═══██╗██╔══██╗██╔════╝
█████╗  ██║     ███████║███████╗███████║██║     ██║   ██║██║  ██║█████╗
██╔══╝  ██║     ██╔══██║╚════██║██╔══██║██║     ██║   ██║██║  ██║██╔══╝
██║     ███████╗██║  ██║███████║██║  ██║╚██████╗╚██████╔╝██████╔╝███████╗
╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
```

# flashcode-bulk-apikey

**Bulk-create Flash Code accounts with auto-generated API keys — OpenAI-compatible inference (deepseek-v4.1-flash / deepseek-v4-pro) with tool-calling + 9Router connector.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-2%20served-412991?style=for-the-badge)](https://api.flashcode.cc)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Quick start](#-quick-start) · [🎁 Free tier](#-free-tier--how-much-you-get) · [🤖 Models](#-models--all-2-of-them) · [🧪 Use the API](#-how-to-use-the-api) · [✅ Verified](#-verified-working--every-key-is-tested) · [🧭 How it works](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [🔌 OmniRoute](#-connect-to-omniroute) · [⚙️ Options](#️-cli-options) · [🛰️ Proxies](#️-behind-a-proxy) · [🐞 Issues](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Why this exists

Flash Code is a New API fork with **no captcha** and a plain e-mail + password sign-up. Two things decide whether a minted key is usable: the token must live in the group whose channels actually serve the model (**`DeepSeek 官转`** — a token left on `default` is answered `No available channel for model deepseek-v4.1-flash under group default (distributor)`), and the e-mail must be a real `@gmail.com` address. Both models call tools (verified with a `get_time` schema: a real `tool_calls` payload with correct arguments came back).

## 🎁 Free tier — how much you get

| What | Value |
| --- | --- |
| Sign-up grant | **50,000 quota** on the account (`quota_per_unit: 500000`) |
| Daily check-in | **disabled** (`签到功能未启用`) |
| Captcha at sign-up | **none** (`turnstile_check: false`) |
| E-mail the panel accepts | plain `@gmail.com` |
| Token group | **`DeepSeek 官转`** — the `default` group has no channel for these models |
| Tool calling | **yes** on `deepseek-v4.1-flash` and `deepseek-v4-pro` |
| The unit that scales | **one account = one key** |

> 💡 The free tier is set by Flash Code and can change. Check the live numbers at [api.flashcode.cc](https://api.flashcode.cc) — and let the tool's own gate decide:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Models — all 2 of them

`GET /v1/models` on a live key lists exactly two ids, both verified with a real chat call and a real `tool_calls` answer:

| Model ID | Note |
| --- | --- |
| `deepseek-v4.1-flash` | default verification model · group `DeepSeek 官转` |
| `deepseek-v4-pro` | same group |

## 🧪 How to use the API

The base URL is **\`https://api.flashcode.cc/v1\`** — OpenAI-compatible, so anything that speaks OpenAI works (SDKs, Cursor, OpenCode, Kilo Code, …).

```bash
curl https://api.flashcode.cc/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"<model id>","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

## 🛠 Quick start

### 🖱️ The launcher

## ✅ Verified working — every key is tested

Measured 2026-10-22 through the WARP exit fleet: register → login → token (group `DeepSeek 官转`) → chat 200 with content, and a `get_time` tool call returned as a real `tool_calls` payload on both model ids. A token minted without the group answered `503 No available channel … under group default (distributor)`, which is why the tool sets the group.

> **Quality gates.** Every key here passed a live `chat-200` before it was written to `keys.txt`
> (dead keys are never shipped). Router combos follow the same rule at the model level: an entry is
> added **only if the model answers `chat-200` and can call tools** — a model without tool support,
> a dead key or a dead provider is dropped instead of added. Re-run the verify step any time;
> failures are reported, never hidden.

## 🧭 How it works

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: Flash Code page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://api.flashcode.cc/v1/chat/completions → real content = the key is live
```

| Step | Call | Notes |
| --- | --- | --- |
| gates | `GET /api/status` | register + e-mail verification on, `turnstile_check: false`, check-in off |
| mailbox | Emailnator gmail | a fresh address per account |
| code | `GET /api/verification?email=…` | 6-digit code; brand mail subject `Flash Code邮箱验证邮件` |
| register | `POST /api/user/register` | username + password + `verification_code` |
| login | `POST /api/user/login` | session cookie (+ `New-Api-User` header) |
| key | `POST /api/token/` with `group: "DeepSeek 官转"` | the group is what makes the model reachable |
| proof | `POST /v1/chat/completions` | 200 with real content (and `tool_calls` when tools are sent) = the key is live |

## ⚙️ CLI options

```bash
node src/cli.js --count 10
node src/cli.js --verify-only
node src/cli.js --screen
node src/launcher.js
```

## 🛰️ Behind a proxy

**Required.** Every account is minted through an exit from your list (the panel binds a session to the exit that created it and bans abusive exits).

- One exit per line in `proxies.txt` (`http://`, `socks5://`, `socks4://` or bare `host:port`), or `FLASHCODE_PROXIES`, or `--pool <file>`.
- Without a list the tool stops and says so — it never falls back to your own address.

## 📄 Files

| Path | Contents |
| --- | --- |
| `keys.txt` | one live-verified key per line — git-ignored |
| `keys-dead.txt` | keys that stopped answering, with the panel's answer kept verbatim |
| `accounts.json` | e-mail, password, steps and the verification result per account — git-ignored |
| `proxies.txt` | your exits — git-ignored |
| `out/` | per-run logs — git-ignored |

## 🔌 Connect to 9Router

## 🔌 Connect to OmniRoute
## 🔑 What one key gets you

| | |
| --- | --- |
| 🏢 Provider | **Flash Code** — [api.flashcode.cc](https://api.flashcode.cc) |
| 🎁 What the provider gives | one gmail account per key · group `DeepSeek 官转` · every key chat-200 + tools-verified |
| 🔑 What one key gets you | one API key scoped to its own account: the 2 model ids on the endpoint below, at your plan's limits. The quota lives on the **account**, which is exactly why this tool creates one account per key |
| 🌐 API shape | OpenAI-compatible: `POST https://api.flashcode.cc/v1/chat/completions` |
| 🔒 Your data | only api.flashcode.cc and the inbox backend you configure are contacted; keys stay on your machine |

## 🐞 Issues

If Flash Code changes its signup shape or rate limits, the tool stops at that step and says so. **[Open an issue](../../issues)** with the command you ran and the exact output; PRs are welcome.

## 📄 License

MIT © 2026 — see [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 flashcode-bulk-apikey contributors

</div>
