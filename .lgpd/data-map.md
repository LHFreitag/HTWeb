# Mapa de dados (inventário reverso, 2026-11-23)

| # | Atividade | Onde no código | Titulares | Dados | Armazenamento | Terceiros |
|---|---|---|---|---|---|---|
| A1 | Pedido de demonstração | `site/components/DemoForm.jsx` → `enviarLead()` | Potenciais clientes (PJ/PF responsáveis) | nome, WhatsApp, cidade, e-mail (opcional), tipo de negócio, nº de unidades, sistema atual | Hoje: não grava (abre WhatsApp). Futuro: `leads` | Meta (WhatsApp) |
| A2 | Consentimento de marketing | `privacidade/consentimentoMarketing.js` | Mesmos de A1 | evento GRANTED/REVOKED, versão da política, texto apresentado, página | Futuro: `consentimentos` (append-only) | — |
| A3 | Conversa comercial e de suporte no WhatsApp | links `wa.me` | Visitantes e clientes | número, nome, mensagens | Celular/WhatsApp Business do comercial | Meta |
| A4 | Abertura de chamado | `components/FormularioChamado.jsx` | Clientes | e-mail, telefone (opcional), título e descrição | Firestore `chamados` | Google |
| A5 | Cadastro e login da equipe de suporte | `pages/SuporteNovoPage.jsx`, `contexts/AuthContext.jsx` | Colaboradores/terceirizados | nome, e-mail, telefone, experiência, credenciais (Firebase Auth) — **CPF removido** | Firestore `suportes`, Firebase Auth | Google |
| A6 | Administração do painel | `components/AdminRoute.jsx` | Administradores | e-mail, UID | Firebase Auth, Firestore `admins` | Google |
| A7 | Novidades e treinamentos | páginas admin | — (conteúdo) | arquivos de imagem | Firestore + Storage | Google |
| A8 | Navegação e registros de acesso | Firebase Hosting | Visitantes | IP, user-agent, data/hora | Logs do Google (Hosting) | Google |
| A9 | Estatística (opcional) | `privacidade/consent.js` | Visitantes que aceitarem | cookies `_ga`, eventos de página e conversão | Google Analytics | Google |
| A10 | Marketing/remarketing (opcional) | `privacidade/consent.js` | Visitantes que aceitarem | cookies `_fbp`/`_fbc`, eventos | Meta | Meta |
| A11 | Monitoramento de visitas para o comercial (opcional) | `privacidade/consent.js` (RD Station) | Visitantes que aceitarem marketing | cookies `__trf.src`/`rdtrk`, páginas visitadas, origem (UTM) | RD Station | RD Station (AWS, possivelmente EUA) |

## Armazenamento local do navegador
| Chave | Tipo | Finalidade | Consentimento? |
|---|---|---|---|
| `ht-consent` | localStorage | guarda a escolha de cookies (12 meses) | Não — estritamente necessário |
| `ht-pick` | localStorage | lembra "loja ou restaurante" na home | Não — funcional, sem dado pessoal |
| sessão Firebase Auth | IndexedDB | manter login | Não — necessário |
| `automax_*` (antigos) | localStorage | guardavam e-mail, nome, papel e token | **Removidos**: o app agora apaga essas chaves |

## Removido / minimizado nesta revisão
- Google Fonts (enviava IP do visitante ao Google em toda visita) → fontes locais.
- CPF no cadastro de suporte (não era necessário para liberar acesso).
- E-mail, nome e papel do usuário no localStorage.

## ECA Digital (Lei 15.211/2025)
Fora das categorias presumidas do Guia ANPD (out/2026) e sem atratividade para menores (software de gestão B2B; teste cumulativo do art. 1º, parágrafo único falha no critério I). **N/A documentado.**
