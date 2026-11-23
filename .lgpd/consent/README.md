# Consentimento

## Cookies (`chamados/src/privacidade/consent.js`, `CookieBanner.jsx`)
- Categorias: necessários (sempre), estatística (GA4 — `VITE_GA_ID`), marketing (Meta Pixel — `VITE_META_PIXEL_ID`).
- Nada opcional carrega antes do aceite. "Recusar opcionais" tem o mesmo peso visual de "Aceitar todos".
- Granular em "Personalizar"; reabrível pelo link "Preferências de cookies" no rodapé e na política.
- Registro local `ht-consent` (versão, data, escolhas); vale 12 meses. Revogar apaga `_ga*`, `_fbp`, `_fbc` e desliga as ferramentas.
- Sem nenhuma ferramenta configurada o banner não aparece em produção (não há o que consentir).

## Marketing por WhatsApp/e-mail (`consentimentoMarketing.js`)
- Caixa separada, desmarcada, não condiciona o pedido de demonstração (art. 8º, § 4º; art. 9º, § 3º).
- Evento `{tipo, finalidade, versaoPolitica, textoApresentado, canal, pagina, ocorridoEm}` vai junto do lead.
- Ledger append-only: coleção `consentimentos`, regra só permite `create` (testado). Revogar = novo evento `REVOKED`.
- Mudança material de finalidade → nova `VERSAO_POLITICA` e nova coleta (art. 8º, § 6º).
