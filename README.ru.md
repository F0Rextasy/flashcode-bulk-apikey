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

**Массовое создание аккаунтов Flash Code с автоматически сгенерированными API-ключами — OpenAI-совместимый инференс (deepseek-v4.1-flash / deepseek-v4-pro) с вызовом инструментов + коннектор 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-2%20served-412991?style=for-the-badge)](https://api.flashcode.cc)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Быстрый старт](#-quick-start) · [🎁 Бесплатный тариф](#-free-tier--how-much-you-get) · [🤖 Модели](#-models--all-2-of-them) · [🧪 Использование API](#-how-to-use-the-api) · [✅ Проверено](#-verified-working--every-key-is-tested) · [🧭 Как это работает](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ Опции](#️-cli-options) · [🛰️ Прокси](#️-behind-a-proxy) · [🐞 Проблемы](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Зачем это нужно

Flash Code — это форк New API с **отсутствием капчи** и простой регистрацией по e-mail + паролю. Два фактора определяют, будет ли созданный ключ пригоден для использования: токен должен находиться в группе, каналы которой действительно обслуживают модель (**`DeepSeek 官转`** — токен, оставленный в `default`, получает ответ `No available channel for model deepseek-v4.1-flash under group default (distributor)`), и e-mail должен быть реальным адресом `@gmail.com`. Обе модели поддерживают вызов инструментов (проверено со схемой `get_time`: вернулся настоящий `tool_calls` с корректными аргументами).

## 🎁 Бесплатный тариф — сколько вы получаете

| Что | Значение |
| --- | --- |
| Бонус при регистрации | **50 000 квоты** на аккаунте (`quota_per_unit: 500000`) |
| Ежедневная отметка | **отключена** (`签到功能未启用`) |
| Капча при регистрации | **отсутствует** (`turnstile_check: false`) |
| E-mail, который принимает панель | обычный `@gmail.com` |
| Группа токена | **`DeepSeek 官转`** — в группе `default` нет канала для этих моделей |
| Вызов инструментов | **да** для `deepseek-v4.1-flash` и `deepseek-v4-pro` |
| Единица масштабирования | **один аккаунт = один ключ** |

> 💡 Бесплатный тариф устанавливается Flash Code и может измениться. Проверяйте актуальные цифры на [api.flashcode.cc](https://api.flashcode.cc) — и пусть собственный контроль инструмента решит:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Модели — все 2 из них

`GET /v1/models` на живом ключе возвращает ровно два идентификатора, оба проверены реальным вызовом чата и настоящим ответом `tool_calls`:

| ID модели | Примечание |
| --- | --- |
| `deepseek-v4.1-flash` | модель проверки по умолчанию · группа `DeepSeek 官转` |
| `deepseek-v4-pro` | та же группа |

## 🧪 Как использовать API

Базовый URL — **\`https://api.flashcode.cc/v1\`** — совместим с OpenAI, поэтому работает всё, что говорит на языке OpenAI (SDK, Cursor, OpenCode, Kilo Code, …).

```bash
curl https://api.flashcode.cc/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"<model id>","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

## 🛠 Быстрый старт

### 🖱️ Лаунчер

## ✅ Проверено в работе — каждый ключ протестирован

Измерено 2026-10-22 через пул выходов WARP: регистрация → вход → токен (группа `DeepSeek 官转`) → чат 200 с контентом, и вызов инструмента `get_time` вернулся как настоящий `tool_calls` для обоих идентификаторов моделей. Токен, созданный без группы, получил ответ `503 No available channel … under group default (distributor)`, поэтому инструмент устанавливает группу.

> **Контроль качества.** Каждый ключ здесь прошёл живой `chat-200` прежде чем был записан в `keys.txt`
> (мёртвые ключи никогда не поставляются). Комбинации роутера следуют тому же правилу на уровне модели: запись
> добавляется **только если модель отвечает `chat-200` и умеет вызывать инструменты** — модель без поддержки инструментов,
> мёртвый ключ или мёртвый провайдер отбрасывается, а не добавляется. Перезапускайте шаг проверки в любое время;
> сбои сообщаются, никогда не скрываются.

## 🧭 Как это работает

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: Flash Code page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://api.flashcode.cc/v1/chat/completions → real content = the key is live
```

| Шаг | Вызов | Примечания |
| --- | --- | --- |
| шлюзы | `GET /api/status` | регистрация + подтверждение e-mail включены, `turnstile_check: false`, отметка отключена |
| почтовый ящик | Emailnator gmail | новый адрес для каждого аккаунта |
| код | `GET /api/verification?email=…` | 6-значный код; тема письма бренда `Flash Code邮箱验证邮件` |
| регистрация | `POST /api/user/register` | имя пользователя + пароль + `verification_code` |
| вход | `POST /api/user/login` | сессионная cookie (+ заголовок `New-Api-User`) |
| ключ | `POST /api/token/` с `group: "DeepSeek 官转"` | именно группа делает модель доступной |
| доказательство | `POST /v1/chat/completions` | 200 с реальным контентом (и `tool_calls`, когда передаются инструменты) = ключ живой |

## ⚙️ Опции CLI

```bash
node src/cli.js --count 10
node src/cli.js --verify-only
node src/cli.js --screen
node src/launcher.js
```

## 🛰️ За прокси

**Обязательно.** Каждый аккаунт создаётся через выход из вашего списка (панель привязывает сессию к выходу, который её создал, и блокирует злоупотребляющие выходы).

- Один выход на строку в `proxies.txt` (`http://`, `socks5://`, `socks4://` или просто `host:port`), либо `FLASHCODE_PROXIES`, либо `--pool <file>`.
- Без списка инструмент останавливается и сообщает об этом — он никогда не откатывается к вашему собственному адресу.

## 📄 Файлы

| Путь | Содержимое |
| --- | --- |
| `keys.txt` | один проверенный живой ключ на строку — игнорируется git |
| `keys-dead.txt` | ключи, которые перестали отвечать, с ответом панели, сохранённым дословно |
| `accounts.json` | e-mail, пароль, шаги и результат проверки для каждого аккаунта — игнорируется git |
| `proxies.txt` | ваши выходы — игнорируется git |
| `out/` | логи каждого запуска — игнорируется git |

## 🔌 Подключение к 9Router

## 🔌 Подключение к OmniRoute
## 🔌 Подключение к OmniRoute
## 🔑 Что даёт один ключ

| | |
| --- | --- |
| 🏢 Провайдер | **Flash Code** — [api.flashcode.cc](https://api.flashcode.cc) |
| 🎁 Что даёт провайдер | один gmail-аккаунт на ключ · группа `DeepSeek 官转` · каждый ключ проверен chat-200 + инструментами |
| 🔑 Что даёт один ключ | один API-ключ, привязанный к своему аккаунту: 2 идентификатора моделей на указанном ниже эндпоинте, в пределах вашего тарифа. Квота живёт на **аккаунте**, именно поэтому этот инструмент создаёт один аккаунт на ключ |
| 🌐 Форма API | Совместим с OpenAI: `POST https://api.flashcode.cc/v1/chat/completions` |
| 🔒 Ваши данные | связь только с api.flashcode.cc и настроенным вами бэкендом почтового ящика; ключи остаются на вашей машине |

## 🐞 Проблемы

Если Flash Code изменит форму регистрации или лимиты, инструмент остановится на этом шаге и сообщит об этом. **[Откройте issue](../../issues)** с командой, которую вы запустили, и точным выводом; PR приветствуются.

## 📄 Лицензия

MIT © 2026 — см. [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 flashcode-bulk-apikey contributors

</div>