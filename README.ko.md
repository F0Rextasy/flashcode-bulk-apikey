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

**자동 생성된 API 키로 Flash Code 계정을 대량 생성 — OpenAI 호환 추론(deepseek-v4.1-flash / deepseek-v4-pro), 툴 호출 + 9Router 커넥터 지원.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-2%20served-412991?style=for-the-badge)](https://api.flashcode.cc)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 빠른 시작](#-quick-start) · [🎁 무료 티어](#-free-tier--how-much-you-get) · [🤖 모델](#-models--all-2-of-them) · [🧪 API 사용법](#-how-to-use-the-api) · [✅ 검증됨](#-verified-working--every-key-is-tested) · [🧭 작동 방식](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ 옵션](#️-cli-options) · [🛰️ 프록시](#️-behind-a-proxy) · [🐞 이슈](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ 이 도구가 존재하는 이유

Flash Code는 **캡차가 없고** 이메일 + 비밀번호로 간단히 가입할 수 있는 New API 포크입니다. 발급된 키가 사용 가능한지는 두 가지로 결정됩니다. 토큰이 실제로 해당 모델을 서비스하는 채널이 속한 그룹(**`DeepSeek 官转`**)에 있어야 하며(`default`에 남아 있는 토큰은 `No available channel for model deepseek-v4.1-flash under group default (distributor)`라는 응답을 받습니다), 이메일이 실제 `@gmail.com` 주소여야 합니다. 두 모델 모두 툴을 호출합니다(`get_time` 스키마로 검증: 올바른 인자를 담은 실제 `tool_calls` 페이로드가 반환됨).

## 🎁 무료 티어 — 얼마나 받을 수 있나

| 항목 | 값 |
| --- | --- |
| 가입 지급량 | 계정에 **50,000 쿼터** (`quota_per_unit: 500000`) |
| 일일 출석 체크 | **비활성화** (`签到功能未启用`) |
| 가입 시 캡차 | **없음** (`turnstile_check: false`) |
| 패널이 허용하는 이메일 | 일반 `@gmail.com` |
| 토큰 그룹 | **`DeepSeek 官转`** — `default` 그룹에는 이 모델들을 위한 채널이 없음 |
| 툴 호출 | `deepseek-v4.1-flash`와 `deepseek-v4-pro`에서 **지원** |
| 확장 단위 | **계정 하나 = 키 하나** |

> 💡 무료 티어는 Flash Code가 정하며 변경될 수 있습니다. 실시간 수치는 [api.flashcode.cc](https://api.flashcode.cc)에서 확인하세요 — 그리고 도구 자체의 게이트가 판단하게 하세요:

```bash
node src/cli.js --verify-only     # keys.txt의 모든 키가 실제 채팅 호출로 재검증됩니다
```

## 🤖 모델 — 딱 2개

실제 키로 `GET /v1/models`를 호출하면 정확히 두 개의 id가 나열되며, 둘 다 실제 채팅 호출과 실제 `tool_calls` 응답으로 검증되었습니다:

| 모델 ID | 비고 |
| --- | --- |
| `deepseek-v4.1-flash` | 기본 검증 모델 · 그룹 `DeepSeek 官转` |
| `deepseek-v4-pro` | 동일 그룹 |

## 🧪 API 사용법

베이스 URL은 **\`https://api.flashcode.cc/v1\`** 입니다 — OpenAI 호환이므로 OpenAI를 지원하는 모든 것(SDK, Cursor, OpenCode, Kilo Code 등)이 작동합니다.

```bash
curl https://api.flashcode.cc/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"<model id>","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

## 🛠 빠른 시작

### 🖱️ 런처

## ✅ 검증됨 — 모든 키가 테스트됩니다

2026-10-22에 WARP 출구 풀을 통해 측정: 가입 → 로그인 → 토큰(그룹 `DeepSeek 官转`) → 콘텐츠가 담긴 채팅 200, 그리고 `get_time` 툴 호출이 두 모델 id 모두에서 실제 `tool_calls` 페이로드로 반환되었습니다. 그룹 없이 발급된 토큰은 `503 No available channel … under group default (distributor)`를 반환했으며, 이것이 이 도구가 그룹을 설정하는 이유입니다.

> **품질 게이트.** 여기 있는 모든 키는 `keys.txt`에 기록되기 전에 실제 `chat-200`을 통과했습니다
> (죽은 키는 절대 배포되지 않습니다). 라우터 조합도 모델 수준에서 같은 규칙을 따릅니다: 모델이
> `chat-200`을 응답하고 툴을 호출할 수 **있는 경우에만** 항목이 추가됩니다 — 툴을 지원하지 않는 모델,
> 죽은 키, 죽은 제공자는 추가되지 않고 제거됩니다. 검증 단계는 언제든 다시 실행할 수 있으며,
> 실패는 보고되지만 절대 숨겨지지 않습니다.

## 🧭 작동 방식

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: Flash Code page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://api.flashcode.cc/v1/chat/completions → real content = the key is live
```

| 단계 | 호출 | 비고 |
| --- | --- | --- |
| 게이트 | `GET /api/status` | 가입 + 이메일 인증 활성화, `turnstile_check: false`, 출석 체크 비활성화 |
| 메일함 | Emailnator gmail | 계정마다 새 주소 |
| 코드 | `GET /api/verification?email=…` | 6자리 코드; 브랜드 메일 제목 `Flash Code邮箱验证邮件` |
| 가입 | `POST /api/user/register` | 사용자 이름 + 비밀번호 + `verification_code` |
| 로그인 | `POST /api/user/login` | 세션 쿠키 (+ `New-Api-User` 헤더) |
| 키 | `POST /api/token/` with `group: "DeepSeek 官转"` | 이 그룹이 모델에 접근 가능하게 만드는 요소 |
| 검증 | `POST /v1/chat/completions` | 실제 콘텐츠와 함께 200 (툴을 보내면 `tool_calls`도) = 키가 살아 있음 |

## ⚙️ CLI 옵션

```bash
node src/cli.js --count 10
node src/cli.js --verify-only
node src/cli.js --screen
node src/launcher.js
```

## 🛰️ 프록시 뒤에서

**필수입니다.** 모든 계정은 목록에 있는 출구를 통해 발급됩니다(패널은 세션을 생성한 출구에 바인딩하고 악용하는 출구를 차단합니다).

- `proxies.txt`에 한 줄에 하나의 출구(`http://`, `socks5://`, `socks4://` 또는 `host:port`만), 또는 `FLASHCODE_PROXIES`, 또는 `--pool <file>`.
- 목록이 없으면 도구는 중단하고 그렇게 알립니다 — 절대 자신의 주소로 폴백하지 않습니다.

## 📄 파일

| 경로 | 내용 |
| --- | --- |
| `keys.txt` | 한 줄에 하나의 실제 검증된 키 — git 무시됨 |
| `keys-dead.txt` | 응답을 멈춘 키, 패널의 응답을 그대로 보존 |
| `accounts.json` | 계정별 이메일, 비밀번호, 단계 및 검증 결과 — git 무시됨 |
| `proxies.txt` | 사용자의 출구 — git 무시됨 |
| `out/` | 실행별 로그 — git 무시됨 |

## 🔌 9Router에 연결

## 🔌 OmniRoute에 연결
## 🔌 OmniRoute에 연결
## 🔑 키 하나로 얻는 것

| | |
| --- | --- |
| 🏢 제공자 | **Flash Code** — [api.flashcode.cc](https://api.flashcode.cc) |
| 🎁 제공자가 주는 것 | 키마다 gmail 계정 하나 · 그룹 `DeepSeek 官转` · 모든 키 chat-200 + 툴 검증됨 |
| 🔑 키 하나로 얻는 것 | 자체 계정에 범위가 지정된 API 키 하나: 아래 엔드포인트의 2개 모델 id를 요금제 한도 내에서. 쿼터는 **계정**에 있으므로, 이 도구가 키마다 계정 하나를 생성하는 것입니다 |
| 🌐 API 형태 | OpenAI 호환: `POST https://api.flashcode.cc/v1/chat/completions` |
| 🔒 데이터 | api.flashcode.cc와 사용자가 설정한 메일함 백엔드만 접속됩니다; 키는 사용자의 컴퓨터에 남습니다 |

## 🐞 이슈

Flash Code가 가입 형태나 속도 제한을 변경하면, 도구는 해당 단계에서 중단하고 그렇게 알립니다. 실행한 명령과 정확한 출력을 포함하여 **[이슈를 열어주세요](../../issues)**; PR도 환영합니다.

## 📄 라이선스

MIT © 2026 — [LICENSE](LICENSE) 참조.

<div align="center">

**[MIT](LICENSE)** © 2026 flashcode-bulk-apikey contributors

</div>