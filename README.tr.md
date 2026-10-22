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
**Otomatik oluşturulan API anahtarlarıyla toplu Flash Code hesabı açın — araç çağırma destekli OpenAI uyumlu çıkarım (deepseek-v4.1-flash / deepseek-v4-pro) + 9Router bağlayıcısı.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-2%20served-412991?style=for-the-badge)](https://api.flashcode.cc)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Hızlı başlangıç](#-quick-start) · [🎁 Ücretsiz katman](#-free-tier--how-much-you-get) · [🤖 Modeller](#-models--all-2-of-them) · [🧪 API'yi kullanın](#-how-to-use-the-api) · [✅ Doğrulandı](#-verified-working--every-key-is-tested) · [🧭 Nasıl çalışır](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [🔌 OmniRoute](#-connect-to-omniroute) · [⚙️ Seçenekler](#️-cli-options) · [🛰️ Proxy'ler](#️-behind-a-proxy) · [🐞 Sorunlar](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Bu neden var

Flash Code, **captcha'sı olmayan** ve düz e-posta + parola ile kayıt olunabilen bir New API çatalıdır. Üretilen bir anahtarın kullanılabilir olup olmadığını iki şey belirler: token, kanalları modeli gerçekten sunan grupta bulunmalıdır (**`DeepSeek 官转`** — `default` üzerinde bırakılan bir token'a `No available channel for model deepseek-v4.1-flash under group default (distributor)` yanıtı verilir) ve e-posta gerçek bir `@gmail.com` adresi olmalıdır. Her iki model de araçları çağırır (bir `get_time` şemasıyla doğrulandı: doğru argümanlarla gerçek bir `tool_calls` yükü geri döndü).

## 🎁 Ücretsiz katman — ne kadar alıyorsunuz

| Ne | Değer |
| --- | --- |
| Kayıt hediyesi | Hesaba **50.000 kota** (`quota_per_unit: 500000`) |
| Günlük giriş | **devre dışı** (`签到功能未启用`) |
| Kayıtta captcha | **yok** (`turnstile_check: false`) |
| Panelin kabul ettiği e-posta | düz `@gmail.com` |
| Token grubu | **`DeepSeek 官转`** — `default` grubunda bu modeller için kanal yok |
| Araç çağırma | `deepseek-v4.1-flash` ve `deepseek-v4-pro` üzerinde **evet** |
| Ölçeklenen birim | **bir hesap = bir anahtar** |

> 💡 Ücretsiz katman Flash Code tarafından belirlenir ve değişebilir. Güncel sayıları [api.flashcode.cc](https://api.flashcode.cc) adresinden kontrol edin — ve kararı aracın kendi kapısına bırakın:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modeller — ikisi de

Canlı bir anahtarda `GET /v1/models` tam olarak iki kimlik listeler; her ikisi de gerçek bir sohbet çağrısı ve gerçek bir `tool_calls` yanıtıyla doğrulandı:

| Model Kimliği | Not |
| --- | --- |
| `deepseek-v4.1-flash` | varsayılan doğrulama modeli · grup `DeepSeek 官转` |
| `deepseek-v4-pro` | aynı grup |

## 🧪 API'yi nasıl kullanırım

Temel URL **\`https://api.flashcode.cc/v1\`** — OpenAI uyumlu, yani OpenAI konuşan her şey çalışır (SDK'lar, Cursor, OpenCode, Kilo Code, …).

```bash
curl https://api.flashcode.cc/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"<model id>","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

## 🛠 Hızlı başlangıç

### 🖱️ Başlatıcı

## ✅ Doğrulandı — her anahtar test edilir

2026-10-22 tarihinde WARP çıkış filosu üzerinden ölçüldü: kayıt → giriş → token (`DeepSeek 官转` grubu) → içerikli sohbet 200, ve bir `get_time` araç çağrısı her iki model kimliğinde de gerçek bir `tool_calls` yükü olarak döndü. Grup olmadan üretilen bir token `503 No available channel … under group default (distributor)` yanıtı verdi; bu yüzden araç grubu ayarlar.

> **Kalite kapıları.** Buradaki her anahtar `keys.txt` dosyasına yazılmadan önce canlı bir `chat-200` geçti
> (ölü anahtarlar asla gönderilmez). Yönlendirici kombinasyonları model düzeyinde aynı kuralı izler: bir giriş
> **yalnızca model `chat-200` yanıtlıyorsa ve araçları çağırabiliyorsa** eklenir — araç desteği olmayan bir model,
> ölü bir anahtar veya ölü bir sağlayıcı eklenmek yerine çıkarılır. Doğrulama adımını istediğiniz zaman yeniden çalıştırın;
> hatalar bildirilir, asla gizlenmez.

## 🧭 Nasıl çalışır

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: Flash Code page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://api.flashcode.cc/v1/chat/completions → real content = the key is live
```

| Adım | Çağrı | Notlar |
| --- | --- | --- |
| kapılar | `GET /api/status` | kayıt + e-posta doğrulama açık, `turnstile_check: false`, giriş kapalı |
| posta kutusu | Emailnator gmail | her hesap için yeni bir adres |
| kod | `GET /api/verification?email=…` | 6 haneli kod; marka postası konusu `Flash Code邮箱验证邮件` |
| kayıt | `POST /api/user/register` | kullanıcı adı + parola + `verification_code` |
| giriş | `POST /api/user/login` | oturum çerezi (+ `New-Api-User` başlığı) |
| anahtar | `POST /api/token/` ile `group: "DeepSeek 官转"` | modeli erişilebilir kılan şey gruptur |
| kanıt | `POST /v1/chat/completions` | gerçek içerikle 200 (ve araçlar gönderildiğinde `tool_calls`) = anahtar canlı |

## ⚙️ CLI seçenekleri

```bash
node src/cli.js --count 10
node src/cli.js --verify-only
node src/cli.js --screen
node src/launcher.js
```

## 🛰️ Proxy arkasında

**Gerekli.** Her hesap listenizden bir çıkış üzerinden üretilir (panel bir oturumu onu oluşturan çıkışa bağlar ve kötüye kullanılan çıkışları yasaklar).

- `proxies.txt` içinde satır başına bir çıkış (`http://`, `socks5://`, `socks4://` veya sade `host:port`), ya da `FLASHCODE_PROXIES`, ya da `--pool <file>`.
- Liste olmadan araç durur ve bunu söyler — asla kendi adresinize geri dönmez.

## 📄 Dosyalar

| Yol | İçerik |
| --- | --- |
| `keys.txt` | satır başına bir canlı doğrulanmış anahtar — git tarafından yok sayılır |
| `keys-dead.txt` | yanıt vermeyi bırakan anahtarlar, panelin yanıtı birebir korunarak |
| `accounts.json` | hesap başına e-posta, parola, adımlar ve doğrulama sonucu — git tarafından yok sayılır |
| `proxies.txt` | çıkışlarınız — git tarafından yok sayılır |
| `out/` | çalıştırma başına günlükler — git tarafından yok sayılır |

## 🔌 9Router'e bağlanın

## 🔌 OmniRoute'e bağlanın

## 🔌 OmniRoute'e bağlanın

## 🔌 OmniRoute'e bağlanın

## 🔌 OmniRoute'e bağlanın

## 🔌 OmniRoute'e bağlanın
## 🔌 OmniRoute'e bağlanın
## 🔌 OmniRoute'e bağlanın
## 🔌 OmniRoute'e bağlanın
## 🔌 OmniRoute'e bağlanın
## 🔑 Bir anahtar size ne kazandırır

| | |
| --- | --- |
| 🏢 Sağlayıcı | **Flash Code** — [api.flashcode.cc](https://api.flashcode.cc) |
| 🎁 Sağlayıcının verdikleri | anahtar başına bir gmail hesabı · grup `DeepSeek 官转` · her anahtar chat-200 + araçlarla doğrulanmış |
| 🔑 Bir anahtar size ne kazandırır | kendi hesabına kapsanmış bir API anahtarı: aşağıdaki uç noktada 2 model kimliği, planınızın sınırlarında. Kota **hesapta** yaşar, bu yüzden bu araç anahtar başına bir hesap oluşturur |
| 🌐 API biçimi | OpenAI uyumlu: `POST https://api.flashcode.cc/v1/chat/completions` |
| 🔒 Verileriniz | yalnızca api.flashcode.cc ve yapılandırdığınız posta kutusu arka ucuna bağlanılır; anahtarlar makinenizde kalır |

## 🐞 Sorunlar

Flash Code kayıt biçimini veya hız sınırlarını değiştirirse, araç o adımda durur ve bunu söyler. Çalıştırdığınız komut ve tam çıktıyla birlikte **[bir sorun açın](../../issues)**; PR'lar memnuniyetle karşılanır.

## 📄 Lisans

MIT © 2026 — bkz. [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 flashcode-bulk-apikey katkıda bulunanlar

</div>