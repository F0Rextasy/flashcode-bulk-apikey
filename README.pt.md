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
**Crie contas Flash Code em massa com chaves de API geradas automaticamente — inferência compatível com OpenAI (deepseek-v4.1-flash / deepseek-v4-pro) com chamada de ferramentas + conector 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-2%20served-412991?style=for-the-badge)](https://api.flashcode.cc)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Início rápido](#-quick-start) · [🎁 Nível gratuito](#-free-tier--how-much-you-get) · [🤖 Modelos](#-models--all-2-of-them) · [🧪 Use a API](#-how-to-use-the-api) · [✅ Verificado](#-verified-working--every-key-is-tested) · [🧭 Como funciona](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [🔌 OmniRoute](#-connect-to-omniroute) · [⚙️ Opções](#️-cli-options) · [🛰️ Proxies](#️-behind-a-proxy) · [🐞 Problemas](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Por que isto existe

Flash Code é um fork do New API **sem captcha** e com cadastro simples por e-mail + senha. Duas coisas decidem se uma chave gerada é utilizável: o token precisa estar no grupo cujos canais realmente servem o modelo (**`DeepSeek 官转`** — um token deixado em `default` recebe a resposta `No available channel for model deepseek-v4.1-flash under group default (distributor)`), e o e-mail precisa ser um endereço `@gmail.com` real. Ambos os modelos chamam ferramentas (verificado com um schema `get_time`: um payload `tool_calls` real com argumentos corretos foi retornado).

## 🎁 Nível gratuito — quanto você recebe

| O quê | Valor |
| --- | --- |
| Concessão no cadastro | **50.000 de cota** na conta (`quota_per_unit: 500000`) |
| Check-in diário | **desativado** (`签到功能未启用`) |
| Captcha no cadastro | **nenhum** (`turnstile_check: false`) |
| E-mail que o painel aceita | `@gmail.com` comum |
| Grupo do token | **`DeepSeek 官转`** — o grupo `default` não tem canal para estes modelos |
| Chamada de ferramentas | **sim** em `deepseek-v4.1-flash` e `deepseek-v4-pro` |
| A unidade que escala | **uma conta = uma chave** |

> 💡 O nível gratuito é definido pelo Flash Code e pode mudar. Confira os números atuais em [api.flashcode.cc](https://api.flashcode.cc) — e deixe o próprio gate da ferramenta decidir:

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modelos — todos os 2

`GET /v1/models` em uma chave ativa lista exatamente dois ids, ambos verificados com uma chamada de chat real e uma resposta `tool_calls` real:

| ID do modelo | Observação |
| --- | --- |
| `deepseek-v4.1-flash` | modelo de verificação padrão · grupo `DeepSeek 官转` |
| `deepseek-v4-pro` | mesmo grupo |

## 🧪 Como usar a API

A URL base é **\`https://api.flashcode.cc/v1\`** — compatível com OpenAI, então qualquer coisa que fale OpenAI funciona (SDKs, Cursor, OpenCode, Kilo Code, …).

```bash
curl https://api.flashcode.cc/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"<model id>","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

## 🛠 Início rápido

### 🖱️ O launcher

## ✅ Verificado e funcionando — toda chave é testada

Medido em 2026-10-22 através da frota de saídas WARP: registrar → login → token (grupo `DeepSeek 官转`) → chat 200 com conteúdo, e uma chamada de ferramenta `get_time` retornada como um payload `tool_calls` real em ambos os ids de modelo. Um token gerado sem o grupo respondeu `503 No available channel … under group default (distributor)`, e é por isso que a ferramenta define o grupo.

> **Portões de qualidade.** Toda chave aqui passou por um `chat-200` ao vivo antes de ser gravada em `keys.txt`
> (chaves mortas nunca são entregues). As combinações de roteador seguem a mesma regra no nível do modelo: uma entrada é
> adicionada **somente se o modelo responder `chat-200` e conseguir chamar ferramentas** — um modelo sem suporte a ferramentas,
> uma chave morta ou um provedor morto é descartado em vez de adicionado. Reexecute a etapa de verificação a qualquer momento;
> as falhas são reportadas, nunca escondidas.

## 🧭 Como funciona

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: Flash Code page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://api.flashcode.cc/v1/chat/completions → real content = the key is live
```

| Etapa | Chamada | Observações |
| --- | --- | --- |
| portões | `GET /api/status` | registro + verificação de e-mail ativados, `turnstile_check: false`, check-in desativado |
| caixa de correio | Emailnator gmail | um endereço novo por conta |
| código | `GET /api/verification?email=…` | código de 6 dígitos; assunto do e-mail da marca `Flash Code邮箱验证邮件` |
| registrar | `POST /api/user/register` | nome de usuário + senha + `verification_code` |
| login | `POST /api/user/login` | cookie de sessão (+ cabeçalho `New-Api-User`) |
| chave | `POST /api/token/` com `group: "DeepSeek 官转"` | o grupo é o que torna o modelo acessível |
| prova | `POST /v1/chat/completions` | 200 com conteúdo real (e `tool_calls` quando ferramentas são enviadas) = a chave está ativa |

## ⚙️ Opções da CLI

```bash
node src/cli.js --count 10
node src/cli.js --verify-only
node src/cli.js --screen
node src/launcher.js
```

## 🛰️ Atrás de um proxy

**Obrigatório.** Toda conta é criada através de uma saída da sua lista (o painel vincula uma sessão à saída que a criou e bane saídas abusivas).

- Uma saída por linha em `proxies.txt` (`http://`, `socks5://`, `socks4://` ou apenas `host:port`), ou `FLASHCODE_PROXIES`, ou `--pool <file>`.
- Sem uma lista, a ferramenta para e avisa — ela nunca recorre ao seu próprio endereço.

## 📄 Arquivos

| Caminho | Conteúdo |
| --- | --- |
| `keys.txt` | uma chave verificada ao vivo por linha — ignorada pelo git |
| `keys-dead.txt` | chaves que pararam de responder, com a resposta do painel mantida literalmente |
| `accounts.json` | e-mail, senha, etapas e o resultado da verificação por conta — ignorado pelo git |
| `proxies.txt` | suas saídas — ignorado pelo git |
| `out/` | logs por execução — ignorado pelo git |

## 🔌 Conectar ao 9Router

## 🔌 Conectar ao OmniRoute

## 🔌 Conectar ao OmniRoute

## 🔌 Conectar ao OmniRoute

## 🔌 Conectar ao OmniRoute

## 🔌 Conectar ao OmniRoute
## 🔌 Conectar ao OmniRoute
## 🔌 Conectar ao OmniRoute
## 🔌 Conectar ao OmniRoute
## 🔌 Conectar ao OmniRoute
## 🔑 O que uma chave te dá

| | |
| --- | --- |
| 🏢 Provedor | **Flash Code** — [api.flashcode.cc](https://api.flashcode.cc) |
| 🎁 O que o provedor dá | uma conta gmail por chave · grupo `DeepSeek 官转` · toda chave com chat-200 + ferramentas verificadas |
| 🔑 O que uma chave te dá | uma chave de API limitada à sua própria conta: os 2 ids de modelo no endpoint abaixo, nos limites do seu plano. A cota fica na **conta**, e é exatamente por isso que esta ferramenta cria uma conta por chave |
| 🌐 Formato da API | Compatível com OpenAI: `POST https://api.flashcode.cc/v1/chat/completions` |
| 🔒 Seus dados | apenas api.flashcode.cc e o backend de caixa de entrada que você configurar são contatados; as chaves ficam na sua máquina |

## 🐞 Problemas

Se o Flash Code mudar o formato do cadastro ou os limites de taxa, a ferramenta para nessa etapa e avisa. **[Abra uma issue](../../issues)** com o comando que você executou e a saída exata; PRs são bem-vindos.

## 📄 Licença

MIT © 2026 — veja [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 flashcode-bulk-apikey contributors

</div>