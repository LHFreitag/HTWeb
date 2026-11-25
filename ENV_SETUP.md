# Variáveis de ambiente

Copie `.env.example` para `chamados/.env.local` (a raiz do Vite é `chamados/`).

| Variável | Para quê | Obrigatória |
|---|---|---|
| `VITE_GA_ID` | ID do Google Analytics 4 (ex.: `G-XXXXXXX`). Só carrega depois do aceite no banner de cookies. | Não |
| `VITE_META_PIXEL_ID` | ID do Pixel da Meta. Só carrega depois do aceite de cookies de marketing. | Não |

## Admin

O antigo `VITE_ADMIN_TOKEN` foi removido. Qualquer variável `VITE_*` vai para o JavaScript
público do site, então não serve para guardar senha. O painel administrativo agora usa login do
Firebase Auth + documento em `admins/{uid}`. Passo a passo em `FIRESTORE_RULES.md`.

> O token antigo continua no histórico do git e no bundle publicado antes desta mudança.
> Ele deixa de valer assim que este código for publicado, mas não o reutilize como senha em lugar nenhum.
