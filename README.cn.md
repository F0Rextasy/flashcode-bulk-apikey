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

**批量创建 Flash Code 账户并自动生成 API 密钥 — 兼容 OpenAI 的推理服务（deepseek-v4.1-flash / deepseek-v4-pro），支持工具调用 + 9Router 连接器。**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-2%20served-412991?style=for-the-badge)](https://api.flashcode.cc)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 快速开始](#-quick-start) · [🎁 免费额度](#-free-tier--how-much-you-get) · [🤖 模型](#-models--all-2-of-them) · [🧪 使用 API](#-how-to-use-the-api) · [✅ 已验证](#-verified-working--every-key-is-tested) · [🧭 工作原理](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [⚙️ 选项](#️-cli-options) · [🛰️ 代理](#️-behind-a-proxy) · [🐞 问题反馈](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ 为什么会有这个项目

Flash Code 是 New API 的一个分支，**没有验证码**，只需简单的邮箱 + 密码注册。决定生成的密钥是否可用有两个因素：令牌必须位于其渠道真正提供该模型的组中（**`DeepSeek 官转`** —— 留在 `default` 组的令牌会收到 `No available channel for model deepseek-v4.1-flash under group default (distributor)` 的回复），并且邮箱必须是真实的 `@gmail.com` 地址。两个模型都支持工具调用（已用 `get_time` schema 验证：返回了带有正确参数的真实 `tool_calls` 载荷）。

## 🎁 免费额度 — 你能获得多少

| 项目 | 值 |
| --- | --- |
| 注册赠送 | 账户获得 **50,000 额度**（`quota_per_unit: 500000`） |
| 每日签到 | **已禁用**（`签到功能未启用`） |
| 注册验证码 | **无**（`turnstile_check: false`） |
| 面板接受的邮箱 | 普通 `@gmail.com` |
| 令牌组 | **`DeepSeek 官转`** —— `default` 组没有这些模型的渠道 |
| 工具调用 | `deepseek-v4.1-flash` 和 `deepseek-v4-pro` 上**支持** |
| 扩展单位 | **一个账户 = 一个密钥** |

> 💡 免费额度由 Flash Code 设定，可能会变化。请在 [api.flashcode.cc](https://api.flashcode.cc) 查看实时数据 —— 并让工具自身的关卡来判定：

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 模型 — 全部 2 个

对有效密钥执行 `GET /v1/models` 恰好列出两个 id，两者都已通过真实聊天调用和真实 `tool_calls` 响应验证：

| 模型 ID | 备注 |
| --- | --- |
| `deepseek-v4.1-flash` | 默认验证模型 · 组 `DeepSeek 官转` |
| `deepseek-v4-pro` | 同一组 |

## 🧪 如何使用 API

基础 URL 是 **\`https://api.flashcode.cc/v1\`** —— 兼容 OpenAI，因此任何支持 OpenAI 的工具都能使用（SDK、Cursor、OpenCode、Kilo Code 等）。

```bash
curl https://api.flashcode.cc/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"<model id>","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

## 🛠 快速开始

### 🖱️ 启动器

## ✅ 已验证可用 — 每个密钥都经过测试

2026-10-22 通过 WARP 出口集群测得：注册 → 登录 → 令牌（组 `DeepSeek 官转`）→ 聊天返回 200 及内容，并且 `get_time` 工具调用在两个模型 id 上都返回了真实的 `tool_calls` 载荷。未设置组而生成的令牌会收到 `503 No available channel … under group default (distributor)`，这就是工具会设置组的原因。

> **质量关卡。** 这里的每个密钥在写入 `keys.txt` 之前都通过了实时 `chat-200`
> （失效密钥绝不会被输出）。路由组合在模型层面遵循同样的规则：只有**当模型返回 `chat-200` 且能调用工具**时，
> 才会添加条目 —— 不支持工具的模型、失效的密钥或失效的提供商会
> 被丢弃而不是添加。可随时重新运行验证步骤；
> 失败会被报告，绝不会被隐藏。

## 🧭 工作原理

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: Flash Code page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://api.flashcode.cc/v1/chat/completions → real content = the key is live
```

| 步骤 | 调用 | 备注 |
| --- | --- | --- |
| 关卡 | `GET /api/status` | 注册 + 邮箱验证开启，`turnstile_check: false`，签到关闭 |
| 邮箱 | Emailnator gmail | 每个账户使用全新地址 |
| 验证码 | `GET /api/verification?email=…` | 6 位验证码；品牌邮件主题 `Flash Code邮箱验证邮件` |
| 注册 | `POST /api/user/register` | 用户名 + 密码 + `verification_code` |
| 登录 | `POST /api/user/login` | 会话 cookie（+ `New-Api-User` 请求头） |
| 密钥 | `POST /api/token/`，带 `group: "DeepSeek 官转"` | 正是这个组让模型可访问 |
| 验证 | `POST /v1/chat/completions` | 返回 200 及真实内容（发送工具时还有 `tool_calls`）= 密钥有效 |

## ⚙️ CLI 选项

```bash
node src/cli.js --count 10
node src/cli.js --verify-only
node src/cli.js --screen
node src/launcher.js
```

## 🛰️ 代理后面

**必需。** 每个账户都通过你列表中的出口生成（面板会将会话绑定到创建它的出口，并封禁滥用出口）。

- `proxies.txt` 中每行一个出口（`http://`、`socks5://`、`socks4://` 或裸 `host:port`），或 `FLASHCODE_PROXIES`，或 `--pool <file>`。
- 没有列表时工具会停止并说明原因 —— 它绝不会回退到你自己的地址。

## 📄 文件

| 路径 | 内容 |
| --- | --- |
| `keys.txt` | 每行一个经过实时验证的密钥 —— 已被 git 忽略 |
| `keys-dead.txt` | 停止响应的密钥，并原样保留面板的回复 |
| `accounts.json` | 每个账户的邮箱、密码、步骤和验证结果 —— 已被 git 忽略 |
| `proxies.txt` | 你的出口 —— 已被 git 忽略 |
| `out/` | 每次运行的日志 —— 已被 git 忽略 |

## 🔌 连接到 9Router

## 🔌 连接到 OmniRoute
## 🔌 连接到 OmniRoute
## 🔑 一个密钥能给你什么

| | |
| --- | --- |
| 🏢 提供商 | **Flash Code** — [api.flashcode.cc](https://api.flashcode.cc) |
| 🎁 提供商提供什么 | 每个密钥对应一个 gmail 账户 · 组 `DeepSeek 官转` · 每个密钥都经过 chat-200 + 工具验证 |
| 🔑 一个密钥能给你什么 | 一个限定于其自身账户的 API 密钥：下方端点上的 2 个模型 id，受你套餐的限制。额度存在于**账户**上，这正是本工具为每个密钥创建一个账户的原因 |
| 🌐 API 形态 | 兼容 OpenAI：`POST https://api.flashcode.cc/v1/chat/completions` |
| 🔒 你的数据 | 仅联系 api.flashcode.cc 和你配置的收件箱后端；密钥保留在你的机器上 |

## 🐞 问题反馈

如果 Flash Code 更改其注册形态或速率限制，工具会在该步骤停止并说明原因。请**[提交 issue](../../issues)**，附上你运行的命令和确切的输出；欢迎 PR。

## 📄 许可证

MIT © 2026 — 见 [LICENSE](LICENSE)。

<div align="center">

**[MIT](LICENSE)** © 2026 flashcode-bulk-apikey contributors

</div>