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
**自動生成された API キーで Flash Code アカウントを一括作成 — OpenAI 互換の推論（deepseek-v4.1-flash / deepseek-v4-pro）、ツール呼び出し対応 + 9Router コネクタ。**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-2%20served-412991?style=for-the-badge)](https://api.flashcode.cc)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 クイックスタート](#-quick-start) · [🎁 無料枠](#-free-tier--how-much-you-get) · [🤖 モデル](#-models--all-2-of-them) · [🧪 API の使い方](#-how-to-use-the-api) · [✅ 検証済み](#-verified-working--every-key-is-tested) · [🧭 仕組み](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [🔌 OmniRoute](#-connect-to-omniroute) · [⚙️ オプション](#️-cli-options) · [🛰️ プロキシ](#️-behind-a-proxy) · [🐞 問題報告](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ これが存在する理由

Flash Code は **キャプチャなし**、メールアドレス + パスワードだけで登録できる New API のフォークです。発行されたキーが使えるかどうかを決める要素は 2 つあります。トークンが、そのモデルを実際に提供しているチャネルを持つグループ（**`DeepSeek 官转`**）に属している必要があり（`default` のままのトークンには `No available channel for model deepseek-v4.1-flash under group default (distributor)` が返されます）、メールアドレスは本物の `@gmail.com` アドレスでなければなりません。両モデルともツールを呼び出せます（`get_time` スキーマで検証済み: 正しい引数を持つ本物の `tool_calls` ペイロードが返ってきました）。

## 🎁 無料枠 — どれだけ使えるか

| 項目 | 値 |
| --- | --- |
| 登録時の付与 | アカウントに **50,000 クォータ**（`quota_per_unit: 500000`） |
| 毎日のチェックイン | **無効**（`签到功能未启用`） |
| 登録時のキャプチャ | **なし**（`turnstile_check: false`） |
| パネルが受け付けるメール | 通常の `@gmail.com` |
| トークングループ | **`DeepSeek 官转`** — `default` グループにはこれらのモデルのチャネルがありません |
| ツール呼び出し | `deepseek-v4.1-flash` と `deepseek-v4-pro` で **対応** |
| スケールする単位 | **1 アカウント = 1 キー** |

> 💡 無料枠は Flash Code 側が設定するもので、変更される可能性があります。最新の数値は [api.flashcode.cc](https://api.flashcode.cc) で確認してください。また、ツール自身のゲートに判断させることもできます:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 モデル — 全部で 2 つ

稼働中のキーで `GET /v1/models` を実行すると、ちょうど 2 つの id が返ります。どちらも実際のチャット呼び出しと本物の `tool_calls` 応答で検証済みです:

| モデル ID | 備考 |
| --- | --- |
| `deepseek-v4.1-flash` | デフォルトの検証モデル · グループ `DeepSeek 官转` |
| `deepseek-v4-pro` | 同じグループ |

## 🧪 API の使い方

ベース URL は **\`https://api.flashcode.cc/v1\`** です — OpenAI 互換なので、OpenAI に対応するものなら何でも動作します（SDK、Cursor、OpenCode、Kilo Code など）。

```bash
curl https://api.flashcode.cc/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"<model id>","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

## 🛠 クイックスタート

### 🖱️ ランチャー

## ✅ 検証済み — すべてのキーがテストされています

2026-10-22 に WARP 出口フリート経由で計測: 登録 → ログイン → トークン（グループ `DeepSeek 官转`）→ コンテンツ付きのチャット 200、そして `get_time` ツール呼び出しが両方のモデル id で本物の `tool_calls` ペイロードとして返されました。グループを指定せずに発行したトークンには `503 No available channel … under group default (distributor)` が返されたため、ツールはグループを設定しています。

> **品質ゲート。** ここにあるすべてのキーは、`keys.txt` に書き込まれる前に実際の `chat-200` を通過しています
> （死んだキーは決して出荷されません）。ルーターの組み合わせもモデルレベルで同じルールに従います: エントリが
> 追加されるのは、**モデルが `chat-200` を返し、ツールを呼び出せる場合のみ**です — ツール非対応のモデル、
> 死んだキー、死んだプロバイダは追加されずに除外されます。検証ステップはいつでも再実行できます。
> 失敗は報告され、決して隠されません。

## 🧭 仕組み

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: Flash Code page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://api.flashcode.cc/v1/chat/completions → real content = the key is live
```

| ステップ | 呼び出し | 備考 |
| --- | --- | --- |
| ゲート | `GET /api/status` | 登録 + メール認証が有効、`turnstile_check: false`、チェックイン無効 |
| メールボックス | Emailnator gmail | アカウントごとに新しいアドレス |
| コード | `GET /api/verification?email=…` | 6 桁のコード、ブランドメールの件名は `Flash Code邮箱验证邮件` |
| 登録 | `POST /api/user/register` | ユーザー名 + パスワード + `verification_code` |
| ログイン | `POST /api/user/login` | セッション Cookie（+ `New-Api-User` ヘッダー） |
| キー | `POST /api/token/` に `group: "DeepSeek 官转"` | このグループがモデルを到達可能にします |
| 証明 | `POST /v1/chat/completions` | 実際のコンテンツ付きの 200（ツールを送信した場合は `tool_calls` も）= キーが稼働中 |

## ⚙️ CLI オプション

```bash
node src/cli.js --count 10
node src/cli.js --verify-only
node src/cli.js --screen
node src/launcher.js
```

## 🛰️ プロキシの背後で

**必須です。** すべてのアカウントはあなたのリストにある出口経由で発行されます（パネルはセッションを作成した出口に紐付け、悪用された出口を禁止します）。

- `proxies.txt` に 1 行 1 出口（`http://`、`socks5://`、`socks4://` または素の `host:port`）、あるいは `FLASHCODE_PROXIES`、または `--pool <file>`。
- リストがない場合、ツールは停止してその旨を通知します — 自分のアドレスにフォールバックすることは決してありません。

## 📄 ファイル

| パス | 内容 |
| --- | --- |
| `keys.txt` | 1 行につき 1 つの検証済みキー — git 管理外 |
| `keys-dead.txt` | 応答しなくなったキー、パネルの応答をそのまま保持 |
| `accounts.json` | アカウントごとのメール、パスワード、ステップ、検証結果 — git 管理外 |
| `proxies.txt` | あなたの出口 — git 管理外 |
| `out/` | 実行ごとのログ — git 管理外 |

## 🔌 9Router に接続する

## 🔌 OmniRoute に接続する

## 🔌 OmniRoute に接続する

## 🔌 OmniRoute に接続する

## 🔌 OmniRoute に接続する

## 🔌 OmniRoute に接続する
## 🔌 OmniRoute に接続する
## 🔌 OmniRoute に接続する
## 🔌 OmniRoute に接続する
## 🔑 1 つのキーで得られるもの

| | |
| --- | --- |
| 🏢 プロバイダ | **Flash Code** — [api.flashcode.cc](https://api.flashcode.cc) |
| 🎁 プロバイダが提供するもの | キーごとに 1 つの gmail アカウント · グループ `DeepSeek 官转` · すべてのキーが chat-200 + ツール検証済み |
| 🔑 1 つのキーで得られるもの | 自身のアカウントにスコープされた 1 つの API キー: 下記エンドポイントの 2 つのモデル id を、あなたのプランの制限内で利用できます。クォータは **アカウント** に紐づくため、このツールがキーごとに 1 アカウントを作成するのです |
| 🌐 API の形式 | OpenAI 互換: `POST https://api.flashcode.cc/v1/chat/completions` |
| 🔒 あなたのデータ | 接続されるのは api.flashcode.cc と、あなたが設定した受信トレイバックエンドのみです。キーはあなたのマシン上に留まります |

## 🐞 問題報告

Flash Code が登録の形式やレート制限を変更した場合、ツールはそのステップで停止してその旨を通知します。実行したコマンドと正確な出力を添えて **[issue を作成してください](../../issues)**。PR も歓迎します。

## 📄 ライセンス

MIT © 2026 — [LICENSE](LICENSE) を参照してください。

<div align="center">

**[MIT](LICENSE)** © 2026 flashcode-bulk-apikey contributors

</div>