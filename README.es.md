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
**Crea cuentas de Flash Code en masa con claves API autogeneradas — inferencia compatible con OpenAI (deepseek-v4.1-flash / deepseek-v4-pro) con llamada a herramientas + conector 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-2%20served-412991?style=for-the-badge)](https://api.flashcode.cc)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Inicio rápido](#-quick-start) · [🎁 Nivel gratuito](#-free-tier--how-much-you-get) · [🤖 Modelos](#-models--all-2-of-them) · [🧪 Usa la API](#-how-to-use-the-api) · [✅ Verificado](#-verified-working--every-key-is-tested) · [🧭 Cómo funciona](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [🔌 OmniRoute](#-connect-to-omniroute) · [⚙️ Opciones](#️-cli-options) · [🛰️ Proxies](#️-behind-a-proxy) · [🐞 Problemas](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Por qué existe esto

Flash Code es un fork de New API **sin captcha** y con un registro simple de correo electrónico + contraseña. Dos cosas deciden si una clave generada es utilizable: el token debe estar en el grupo cuyos canales realmente sirven el modelo (**`DeepSeek 官转`** — un token que se deja en `default` recibe como respuesta `No available channel for model deepseek-v4.1-flash under group default (distributor)`), y el correo electrónico debe ser una dirección real de `@gmail.com`. Ambos modelos llaman a herramientas (verificado con un esquema `get_time`: devolvió un payload real de `tool_calls` con los argumentos correctos).

## 🎁 Nivel gratuito — cuánto obtienes

| Qué | Valor |
| --- | --- |
| Concesión de registro | **50,000 de cuota** en la cuenta (`quota_per_unit: 500000`) |
| Registro diario | **deshabilitado** (`签到功能未启用`) |
| Captcha en el registro | **ninguno** (`turnstile_check: false`) |
| Correo electrónico que acepta el panel | `@gmail.com` simple |
| Grupo del token | **`DeepSeek 官转`** — el grupo `default` no tiene canal para estos modelos |
| Llamada a herramientas | **sí** en `deepseek-v4.1-flash` y `deepseek-v4-pro` |
| La unidad que escala | **una cuenta = una clave** |

> 💡 El nivel gratuito lo define Flash Code y puede cambiar. Consulta los números en vivo en [api.flashcode.cc](https://api.flashcode.cc) — y deja que la propia verificación de la herramienta decida:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modelos — los 2 que hay

`GET /v1/models` en una clave activa lista exactamente dos ids, ambos verificados con una llamada de chat real y una respuesta real de `tool_calls`:

| ID del modelo | Nota |
| --- | --- |
| `deepseek-v4.1-flash` | modelo de verificación por defecto · grupo `DeepSeek 官转` |
| `deepseek-v4-pro` | mismo grupo |

## 🧪 Cómo usar la API

La URL base es **\`https://api.flashcode.cc/v1\`** — compatible con OpenAI, así que cualquier cosa que hable OpenAI funciona (SDKs, Cursor, OpenCode, Kilo Code, …).

```bash
curl https://api.flashcode.cc/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"<model id>","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

## 🛠 Inicio rápido

### 🖱️ El lanzador

## ✅ Verificado y funcionando — cada clave se prueba

Medido el 2026-10-22 a través de la flota de salida de WARP: registro → inicio de sesión → token (grupo `DeepSeek 官转`) → chat 200 con contenido, y una llamada a la herramienta `get_time` devuelta como un payload real de `tool_calls` en ambos ids de modelo. Un token generado sin el grupo respondió `503 No available channel … under group default (distributor)`, por eso la herramienta establece el grupo.

> **Controles de calidad.** Cada clave aquí pasó un `chat-200` en vivo antes de escribirse en `keys.txt`
> (las claves muertas nunca se entregan). Las combinaciones del router siguen la misma regla a nivel de modelo: una entrada se
> añade **solo si el modelo responde `chat-200` y puede llamar a herramientas** — un modelo sin soporte de herramientas,
> una clave muerta o un proveedor muerto se descarta en lugar de añadirse. Vuelve a ejecutar el paso de verificación cuando quieras;
> los fallos se reportan, nunca se ocultan.

## 🧭 Cómo funciona

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: Flash Code page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://api.flashcode.cc/v1/chat/completions → real content = the key is live
```

| Paso | Llamada | Notas |
| --- | --- | --- |
| puertas | `GET /api/status` | registro + verificación por correo activados, `turnstile_check: false`, registro diario desactivado |
| buzón | Emailnator gmail | una dirección nueva por cuenta |
| código | `GET /api/verification?email=…` | código de 6 dígitos; asunto del correo de la marca `Flash Code邮箱验证邮件` |
| registro | `POST /api/user/register` | nombre de usuario + contraseña + `verification_code` |
| inicio de sesión | `POST /api/user/login` | cookie de sesión (+ cabecera `New-Api-User`) |
| clave | `POST /api/token/` con `group: "DeepSeek 官转"` | el grupo es lo que hace accesible el modelo |
| prueba | `POST /v1/chat/completions` | 200 con contenido real (y `tool_calls` cuando se envían herramientas) = la clave está activa |

## ⚙️ Opciones de CLI

```bash
node src/cli.js --count 10
node src/cli.js --verify-only
node src/cli.js --screen
node src/launcher.js
```

## 🛰️ Detrás de un proxy

**Obligatorio.** Cada cuenta se crea a través de una salida de tu lista (el panel vincula una sesión a la salida que la creó y banea las salidas abusivas).

- Una salida por línea en `proxies.txt` (`http://`, `socks5://`, `socks4://` o `host:port` sin más), o `FLASHCODE_PROXIES`, o `--pool <file>`.
- Sin una lista, la herramienta se detiene y lo indica — nunca recurre a tu propia dirección.

## 📄 Archivos

| Ruta | Contenido |
| --- | --- |
| `keys.txt` | una clave verificada en vivo por línea — ignorada por git |
| `keys-dead.txt` | claves que dejaron de responder, con la respuesta del panel conservada textualmente |
| `accounts.json` | correo electrónico, contraseña, pasos y el resultado de la verificación por cuenta — ignorado por git |
| `proxies.txt` | tus salidas — ignorado por git |
| `out/` | registros por ejecución — ignorado por git |

## 🔌 Conectar con 9Router

## 🔌 Conectar con OmniRoute

## 🔌 Conectar con OmniRoute

## 🔌 Conectar con OmniRoute

## 🔌 Conectar con OmniRoute

## 🔌 Conectar con OmniRoute
## 🔌 Conectar con OmniRoute
## 🔌 Conectar con OmniRoute
## 🔌 Conectar con OmniRoute
## 🔌 Conectar con OmniRoute
## 🔑 Qué te da una clave

| | |
| --- | --- |
| 🏢 Proveedor | **Flash Code** — [api.flashcode.cc](https://api.flashcode.cc) |
| 🎁 Qué da el proveedor | una cuenta de gmail por clave · grupo `DeepSeek 官转` · cada clave verificada con chat-200 + herramientas |
| 🔑 Qué te da una clave | una clave API limitada a su propia cuenta: los 2 ids de modelo en el endpoint de abajo, con los límites de tu plan. La cuota vive en la **cuenta**, que es exactamente por lo que esta herramienta crea una cuenta por clave |
| 🌐 Forma de la API | compatible con OpenAI: `POST https://api.flashcode.cc/v1/chat/completions` |
| 🔒 Tus datos | solo se contacta con api.flashcode.cc y el backend de buzón que configures; las claves permanecen en tu máquina |

## 🐞 Problemas

Si Flash Code cambia la forma de su registro o sus límites de velocidad, la herramienta se detiene en ese paso y lo indica. **[Abre un issue](../../issues)** con el comando que ejecutaste y la salida exacta; los PRs son bienvenidos.

## 📄 Licencia

MIT © 2026 — consulta [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 flashcode-bulk-apikey contributors

</div>