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
**Flash-Code-Konten in großen Mengen erstellen mit automatisch generierten API-Schlüsseln — OpenAI-kompatible Inferenz (deepseek-v4.1-flash / deepseek-v4-pro) mit Tool-Calling + 9Router-Connector.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-2%20served-412991?style=for-the-badge)](https://api.flashcode.cc)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Schnellstart](#-quick-start) · [🎁 Kostenlose Stufe](#-free-tier--how-much-you-get) · [🤖 Modelle](#-models--all-2-of-them) · [🧪 Die API verwenden](#-how-to-use-the-api) · [✅ Verifiziert](#-verified-working--every-key-is-tested) · [🧭 So funktioniert es](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [🔌 OmniRoute](#-connect-to-omniroute) · [⚙️ Optionen](#️-cli-options) · [🛰️ Proxys](#️-behind-a-proxy) · [🐞 Probleme](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Warum es das gibt

Flash Code ist ein New-API-Fork mit **keinem Captcha** und einer einfachen Registrierung per E-Mail + Passwort. Zwei Dinge entscheiden, ob ein erzeugter Schlüssel nutzbar ist: Das Token muss in der Gruppe liegen, deren Kanäle das Modell tatsächlich bedienen (**`DeepSeek 官转`** — ein Token, das auf `default` bleibt, bekommt die Antwort `No available channel for model deepseek-v4.1-flash under group default (distributor)`), und die E-Mail muss eine echte `@gmail.com`-Adresse sein. Beide Modelle rufen Tools auf (verifiziert mit einem `get_time`-Schema: eine echte `tool_calls`-Nutzlast mit korrekten Argumenten kam zurück).

## 🎁 Kostenlose Stufe — wie viel du bekommst

| Was | Wert |
| --- | --- |
| Registrierungsgutschrift | **50.000 Quota** auf dem Konto (`quota_per_unit: 500000`) |
| Täglicher Check-in | **deaktiviert** (`签到功能未启用`) |
| Captcha bei der Registrierung | **keines** (`turnstile_check: false`) |
| E-Mail, die das Panel akzeptiert | einfache `@gmail.com` |
| Token-Gruppe | **`DeepSeek 官转`** — die Gruppe `default` hat keinen Kanal für diese Modelle |
| Tool-Calling | **ja** bei `deepseek-v4.1-flash` und `deepseek-v4-pro` |
| Die Einheit, die skaliert | **ein Konto = ein Schlüssel** |

> 💡 Die kostenlose Stufe wird von Flash Code festgelegt und kann sich ändern. Prüfe die aktuellen Zahlen unter [api.flashcode.cc](https://api.flashcode.cc) — und lass das eigene Gate des Tools entscheiden:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modelle — alle 2 davon

`GET /v1/models` auf einem aktiven Schlüssel listet genau zwei IDs auf, beide verifiziert mit einem echten Chat-Aufruf und einer echten `tool_calls`-Antwort:

| Modell-ID | Hinweis |
| --- | --- |
| `deepseek-v4.1-flash` | Standard-Verifizierungsmodell · Gruppe `DeepSeek 官转` |
| `deepseek-v4-pro` | dieselbe Gruppe |

## 🧪 Die API verwenden

Die Basis-URL ist **\`https://api.flashcode.cc/v1\`** — OpenAI-kompatibel, also funktioniert alles, was OpenAI spricht (SDKs, Cursor, OpenCode, Kilo Code, …).

```bash
curl https://api.flashcode.cc/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"<model id>","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

## 🛠 Schnellstart

### 🖱️ Der Launcher

## ✅ Verifiziert funktionierend — jeder Schlüssel wird getestet

Gemessen am 22.10.2026 über die WARP-Exit-Flotte: Registrierung → Login → Token (Gruppe `DeepSeek 官转`) → Chat 200 mit Inhalt, und ein `get_time`-Tool-Aufruf kam als echte `tool_calls`-Nutzlast bei beiden Modell-IDs zurück. Ein Token, das ohne die Gruppe erzeugt wurde, antwortete `503 No available channel … under group default (distributor)`, weshalb das Tool die Gruppe setzt.

> **Qualitätsgates.** Jeder Schlüssel hier hat einen Live-`chat-200` bestanden, bevor er in `keys.txt` geschrieben wurde
> (tote Schlüssel werden nie ausgeliefert). Router-Kombinationen folgen derselben Regel auf Modellebene: Ein Eintrag wird
> **nur hinzugefügt, wenn das Modell `chat-200` antwortet und Tools aufrufen kann** — ein Modell ohne Tool-Unterstützung,
> ein toter Schlüssel oder ein toter Anbieter wird verworfen statt hinzugefügt. Führe den Verifizierungsschritt jederzeit erneut aus;
> Fehler werden gemeldet, nie versteckt.

## 🧭 So funktioniert es

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: Flash Code page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://api.flashcode.cc/v1/chat/completions → real content = the key is live
```

| Schritt | Aufruf | Hinweise |
| --- | --- | --- |
| Gates | `GET /api/status` | Registrierung + E-Mail-Verifizierung an, `turnstile_check: false`, Check-in aus |
| Postfach | Emailnator gmail | eine frische Adresse pro Konto |
| Code | `GET /api/verification?email=…` | 6-stelliger Code; Betreff der Marken-Mail `Flash Code邮箱验证邮件` |
| Registrierung | `POST /api/user/register` | Benutzername + Passwort + `verification_code` |
| Login | `POST /api/user/login` | Session-Cookie (+ `New-Api-User`-Header) |
| Schlüssel | `POST /api/token/` mit `group: "DeepSeek 官转"` | die Gruppe ist es, die das Modell erreichbar macht |
| Nachweis | `POST /v1/chat/completions` | 200 mit echtem Inhalt (und `tool_calls`, wenn Tools gesendet werden) = der Schlüssel ist aktiv |

## ⚙️ CLI-Optionen

```bash
node src/cli.js --count 10
node src/cli.js --verify-only
node src/cli.js --screen
node src/launcher.js
```

## 🛰️ Hinter einem Proxy

**Erforderlich.** Jedes Konto wird über einen Exit aus deiner Liste erstellt (das Panel bindet eine Session an den Exit, der sie erstellt hat, und sperrt missbräuchliche Exits).

- Ein Exit pro Zeile in `proxies.txt` (`http://`, `socks5://`, `socks4://` oder nur `host:port`), oder `FLASHCODE_PROXIES`, oder `--pool <file>`.
- Ohne eine Liste stoppt das Tool und sagt es — es fällt nie auf deine eigene Adresse zurück.

## 📄 Dateien

| Pfad | Inhalt |
| --- | --- |
| `keys.txt` | ein live-verifizierter Schlüssel pro Zeile — von Git ignoriert |
| `keys-dead.txt` | Schlüssel, die nicht mehr antworten, mit der Antwort des Panels wortgetreu erhalten |
| `accounts.json` | E-Mail, Passwort, Schritte und das Verifizierungsergebnis pro Konto — von Git ignoriert |
| `proxies.txt` | deine Exits — von Git ignoriert |
| `out/` | Logs pro Lauf — von Git ignoriert |

## 🔌 Mit 9Router verbinden

## 🔌 Mit OmniRoute verbinden

## 🔌 Mit OmniRoute verbinden

## 🔌 Mit OmniRoute verbinden

## 🔌 Mit OmniRoute verbinden

## 🔌 Mit OmniRoute verbinden
## 🔌 Mit OmniRoute verbinden
## 🔌 Mit OmniRoute verbinden
## 🔌 Mit OmniRoute verbinden
## 🔌 Mit OmniRoute verbinden
## 🔑 Was ein Schlüssel dir bringt

| | |
| --- | --- |
| 🏢 Anbieter | **Flash Code** — [api.flashcode.cc](https://api.flashcode.cc) |
| 🎁 Was der Anbieter gibt | ein Gmail-Konto pro Schlüssel · Gruppe `DeepSeek 官转` · jeder Schlüssel chat-200 + Tools-verifiziert |
| 🔑 Was ein Schlüssel dir bringt | ein API-Schlüssel, der auf sein eigenes Konto beschränkt ist: die 2 Modell-IDs am unten stehenden Endpunkt, im Rahmen der Limits deines Tarifs. Die Quota liegt auf dem **Konto**, genau deshalb erstellt dieses Tool ein Konto pro Schlüssel |
| 🌐 API-Form | OpenAI-kompatibel: `POST https://api.flashcode.cc/v1/chat/completions` |
| 🔒 Deine Daten | nur api.flashcode.cc und das von dir konfigurierte Postfach-Backend werden kontaktiert; Schlüssel bleiben auf deinem Rechner |

## 🐞 Probleme

Wenn Flash Code seine Registrierungsform oder Rate-Limits ändert, stoppt das Tool an diesem Schritt und sagt es. **[Öffne ein Issue](../../issues)** mit dem ausgeführten Befehl und der exakten Ausgabe; PRs sind willkommen.

## 📄 Lizenz

MIT © 2026 — siehe [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 flashcode-bulk-apikey contributors

</div>