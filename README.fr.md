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
**Créez en masse des comptes Flash Code avec des clés API générées automatiquement — inférence compatible OpenAI (deepseek-v4.1-flash / deepseek-v4-pro) avec appel d'outils + connecteur 9Router.**

[![Node](https://img.shields.io/badge/Node-%E2%89%A518-3DA639?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/license-MIT-6ea8fe?style=for-the-badge)](LICENSE)
[![Models](https://img.shields.io/badge/models-2%20served-412991?style=for-the-badge)](https://api.flashcode.cc)
[![9Router](https://img.shields.io/badge/9Router-connector-8B5CF6?style=for-the-badge)](#-connect-to-9router)
[![OmniRoute](https://img.shields.io/badge/OmniRoute-connector-8B5CF6?style=for-the-badge)](#-connect-to-omniroute)
[![X](https://img.shields.io/badge/X-%40bigbullapp-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/bigbullapp)

[🛠 Démarrage rapide](#-quick-start) · [🎁 Offre gratuite](#-free-tier--how-much-you-get) · [🤖 Modèles](#-models--all-2-of-them) · [🧪 Utiliser l'API](#-how-to-use-the-api) · [✅ Vérifié](#-verified-working--every-key-is-tested) · [🧭 Comment ça marche](#-how-it-works) · [🔌 9Router](#-connect-to-9router) · [🔌 OmniRoute](#-connect-to-omniroute) · [⚙️ Options](#️-cli-options) · [🛰️ Proxys](#️-behind-a-proxy) · [🐞 Problèmes](#-issues)

</div>

<div align="center">

**English** · [Türkçe](README.tr.md) · [中文](README.cn.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Português](README.pt.md)

</div>

---

## ✨ Pourquoi ce projet existe

Flash Code est un fork de New API **sans captcha** et avec une inscription simple par e-mail + mot de passe. Deux choses déterminent si une clé générée est utilisable : le jeton doit résider dans le groupe dont les canaux servent réellement le modèle (**`DeepSeek 官转`** — un jeton laissé sur `default` reçoit la réponse `No available channel for model deepseek-v4.1-flash under group default (distributor)`), et l'e-mail doit être une véritable adresse `@gmail.com`. Les deux modèles appellent des outils (vérifié avec un schéma `get_time` : une véritable charge utile `tool_calls` avec les arguments corrects a été renvoyée).

## 🎁 Offre gratuite — ce que vous obtenez

| Quoi | Valeur |
| --- | --- |
| Crédit d'inscription | **50 000 quota** sur le compte (`quota_per_unit: 500000`) |
| Pointage quotidien | **désactivé** (`签到功能未启用`) |
| Captcha à l'inscription | **aucun** (`turnstile_check: false`) |
| E-mail accepté par le panneau | simple `@gmail.com` |
| Groupe du jeton | **`DeepSeek 官转`** — le groupe `default` n'a aucun canal pour ces modèles |
| Appel d'outils | **oui** sur `deepseek-v4.1-flash` et `deepseek-v4-pro` |
| L'unité qui évolue | **un compte = une clé** |

> 💡 L'offre gratuite est définie par Flash Code et peut changer. Consultez les chiffres en direct sur [api.flashcode.cc](https://api.flashcode.cc) — et laissez le propre contrôle de l'outil décider :

```bash
node src/cli.js --verify-only     # every key in keys.txt is re-tested with a real chat call
```

## 🤖 Modèles — les 2 au complet

`GET /v1/models` sur une clé active liste exactement deux identifiants, tous deux vérifiés avec un véritable appel de chat et une véritable réponse `tool_calls` :

| ID du modèle | Remarque |
| --- | --- |
| `deepseek-v4.1-flash` | modèle de vérification par défaut · groupe `DeepSeek 官转` |
| `deepseek-v4-pro` | même groupe |

## 🧪 Comment utiliser l'API

L'URL de base est **\`https://api.flashcode.cc/v1\`** — compatible OpenAI, donc tout ce qui parle OpenAI fonctionne (SDK, Cursor, OpenCode, Kilo Code, …).

```bash
curl https://api.flashcode.cc/v1/chat/completions \
  -H "Authorization: Bearer <your key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"<model id>","messages":[{"role":"user","content":"hi"}],"max_tokens":8}'
```

## 🛠 Démarrage rapide

### 🖱️ Le lanceur

## ✅ Vérifié et fonctionnel — chaque clé est testée

Mesuré le 2026-10-22 via la flotte de sortie WARP : inscription → connexion → jeton (groupe `DeepSeek 官转`) → chat 200 avec contenu, et un appel d'outil `get_time` renvoyé sous forme de véritable charge utile `tool_calls` sur les deux identifiants de modèle. Un jeton généré sans le groupe a répondu `503 No available channel … under group default (distributor)`, c'est pourquoi l'outil définit le groupe.

> **Contrôles qualité.** Chaque clé ici a passé un `chat-200` en direct avant d'être écrite dans `keys.txt`
> (les clés mortes ne sont jamais livrées). Les combinaisons de routeur suivent la même règle au niveau du modèle : une entrée n'est
> ajoutée **que si le modèle répond `chat-200` et peut appeler des outils** — un modèle sans prise en charge des outils,
> une clé morte ou un fournisseur mort est écarté au lieu d'être ajouté. Relancez l'étape de vérification à tout moment ;
> les échecs sont signalés, jamais masqués.

## 🧭 Comment ça marche

```
inbox (one address per account)                                  a fresh address per account
   │
   ├─▶ sign-up: Flash Code page → e-mail address → code / link from the inbox
   ├─▶ session: the account's cookies or access token in hand
   ├─▶ key mint: the account's key endpoint → plaintext key returned once (written to disk immediately)
   └─▶ live proof: POST https://api.flashcode.cc/v1/chat/completions → real content = the key is live
```

| Étape | Appel | Remarques |
| --- | --- | --- |
| barrières | `GET /api/status` | inscription + vérification e-mail activées, `turnstile_check: false`, pointage désactivé |
| boîte mail | Emailnator gmail | une adresse fraîche par compte |
| code | `GET /api/verification?email=…` | code à 6 chiffres ; objet du mail de marque `Flash Code邮箱验证邮件` |
| inscription | `POST /api/user/register` | nom d'utilisateur + mot de passe + `verification_code` |
| connexion | `POST /api/user/login` | cookie de session (+ en-tête `New-Api-User`) |
| clé | `POST /api/token/` avec `group: "DeepSeek 官转"` | c'est le groupe qui rend le modèle accessible |
| preuve | `POST /v1/chat/completions` | 200 avec contenu réel (et `tool_calls` lorsque des outils sont envoyés) = la clé est active |

## ⚙️ Options CLI

```bash
node src/cli.js --count 10
node src/cli.js --verify-only
node src/cli.js --screen
node src/launcher.js
```

## 🛰️ Derrière un proxy

**Requis.** Chaque compte est créé via une sortie de votre liste (le panneau lie une session à la sortie qui l'a créée et bannit les sorties abusives).

- Une sortie par ligne dans `proxies.txt` (`http://`, `socks5://`, `socks4://` ou simplement `host:port`), ou `FLASHCODE_PROXIES`, ou `--pool <file>`.
- Sans liste, l'outil s'arrête et le signale — il ne se rabat jamais sur votre propre adresse.

## 📄 Fichiers

| Chemin | Contenu |
| --- | --- |
| `keys.txt` | une clé vérifiée en direct par ligne — ignoré par git |
| `keys-dead.txt` | clés qui ont cessé de répondre, avec la réponse du panneau conservée mot pour mot |
| `accounts.json` | e-mail, mot de passe, étapes et résultat de vérification par compte — ignoré par git |
| `proxies.txt` | vos sorties — ignoré par git |
| `out/` | journaux par exécution — ignoré par git |

## 🔌 Connexion à 9Router

## 🔌 Connexion à OmniRoute

## 🔌 Connexion à OmniRoute

## 🔌 Connexion à OmniRoute

## 🔌 Connexion à OmniRoute

## 🔌 Connexion à OmniRoute
## 🔌 Connexion à OmniRoute
## 🔌 Connexion à OmniRoute
## 🔌 Connexion à OmniRoute
## 🔌 Connexion à OmniRoute
## 🔑 Ce qu'une clé vous offre

| | |
| --- | --- |
| 🏢 Fournisseur | **Flash Code** — [api.flashcode.cc](https://api.flashcode.cc) |
| 🎁 Ce que le fournisseur donne | un compte gmail par clé · groupe `DeepSeek 官转` · chaque clé vérifiée chat-200 + outils |
| 🔑 Ce qu'une clé vous offre | une clé API limitée à son propre compte : les 2 identifiants de modèle sur le point de terminaison ci-dessous, dans les limites de votre offre. Le quota réside sur le **compte**, c'est précisément pourquoi cet outil crée un compte par clé |
| 🌐 Forme de l'API | compatible OpenAI : `POST https://api.flashcode.cc/v1/chat/completions` |
| 🔒 Vos données | seuls api.flashcode.cc et le backend de boîte mail que vous configurez sont contactés ; les clés restent sur votre machine |

## 🐞 Problèmes

Si Flash Code modifie la forme de son inscription ou ses limites de débit, l'outil s'arrête à cette étape et le signale. **[Ouvrez un ticket](../../issues)** avec la commande que vous avez exécutée et la sortie exacte ; les PR sont les bienvenues.

## 📄 Licence

MIT © 2026 — voir [LICENSE](LICENSE).

<div align="center">

**[MIT](LICENSE)** © 2026 flashcode-bulk-apikey contributors

</div>