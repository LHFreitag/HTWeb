# LGPD Privacy Engineering Status

**Projeto**: Site House Tech (repositório HTWeb — site de captação, área do cliente e painel de suporte)
**Cenário**: C (Híbrido) — base legada (chamados/suporte) + site de captação novo
**Controlador**: L. V. Freitag Sistemas e Consultoria (nome fantasia House Tech Sistemas e Consultoria), CNPJ 30.846.822/0001-59, Empresário Individual
**Enquadramento declarativo**: ATPP — Res. CD/ANPD nº 2/2022. Porte no CNPJ: Microempresa, optante do Simples (consulta de 2026-11-23); sem tratamento de alto risco
**Público menor de 18 anos**: não. Site B2B (donos de lojas e restaurantes); ECA Digital avaliado como não aplicável (ver data-map.md)
**Início**: 2026-11-23
**Última atualização**: 2026-11-23
**Encarregado / Canal**: Rota B (ATPP dispensado) — canal: housetechcba@gmail.com e WhatsApp (65) 9934-0033 ⚠ ideal: e-mail privacidade@<domínio próprio>

> Esta análise cobre o que está no repositório. Não é parecer jurídico: revisar com advogado(a) de proteção de dados antes de publicar.

## Escopo verificado vs. fora do repositório
- **Verificado no código**: rotas React, formulários (demonstração, chamado, cadastro de suporte, login), uso do Firestore/Storage/Auth, scripts de terceiros (Google Fonts, analytics), regras do Firestore/Storage, armazenamento local do navegador.
- **Requer validação externa**: titularidade do projeto Firebase `automax-55b5e`; região do Firestore; aceite dos termos de processamento de dados do Google Cloud/Firebase; dados reais já gravados em produção (CPFs antigos em `suportes`); processos humanos do comercial no WhatsApp.

## Pipeline (B até L5, depois A F5–F15)
- [x] L0 — Setup e enquadramento (ATPP: ME confirmada no CNPJ)
- [x] L1 — Discovery e gap analysis → `gaps.md`
- [x] L2 — Data mapping → `data-map.md`
- [x] L3 — Bases legais + LIA → `legal-basis.md`, `lia/`
- [x] L4 — Canal do titular → `encarregado.md`
- [x] L5 — Fornecedores e transferências → `vendors/`, `transfers/`
- [x] L6 — Retenção → `retention.md`
- [x] L7 — Consentimento (cookies + marketing) → `consent/`; ECA Digital: N/A
- [x] L8 — Segurança: regras Firestore/Storage, fim do token admin exposto, cabeçalhos HTTP
- [x] L9 — Direitos do titular → `dsar/workflow.md`
- [x] L10 — Incidentes → `incidents/`
- [x] L11 — ROPA → `ROPA.md`  ⏸ **CHECKPOINT: revisão da empresa**
- [ ] L12 — RIPD: não exigido (sem alto risco no teste cumulativo do art. 4º da Res. 2/2022)
- [x] L13 — Política de privacidade v1 (rascunho publicado no código em `/privacidade`) ⏸ **CHECKPOINT: revisão jurídica antes de ir ao ar**
- [x] L14 — Este status + `gaps.md`

## Controles implementados no código (PR desta data)
- Banner de cookies com recusa tão fácil quanto aceite; GA4 e Pixel da Meta só carregam após consentimento; revogação apaga cookies.
- Páginas `/privacidade` e `/termos`; links no rodapé; dados do controlador do cadastro do CNPJ.
- Formulário de demonstração: aviso de finalidade + caixa de marketing separada e desmarcada, registrada como evento de consentimento.
- Formulários de chamado e de cadastro de suporte com aviso de finalidade; CPF deixou de ser coletado.
- Painel admin com Firebase Auth + `admins/{uid}`; removido token no bundle; nada de dados pessoais no localStorage.
- `firestore.rules` e `storage.rules` com negação por padrão, testadas em emulador (`npm run test:rules`).
- Fontes servidas pelo próprio site (sem Google Fonts).

## Próximo passo
Dados do controlador preenchidos a partir do CNPJ. Falta: confirmar projeto Firebase, revisar `ROPA.md` e a política. Depois: publicar regras e site.
