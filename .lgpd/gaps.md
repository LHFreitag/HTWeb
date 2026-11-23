# Pendências (priorizadas)

## Da empresa (não dá para resolver no código)
1. ~~Dados do controlador~~ preenchidos a partir do CNPJ (2026-11-23). O endereço do CNPJ é residencial: se o cadastro for atualizado para o escritório novo, trocar em `empresa.js`.
2. ~~Porte~~ confirmado: Microempresa → dispensa de encarregado (Res. 2/2022, art. 11), mantendo o canal.
3. ~~Projeto Firebase~~ confirmado (2026-11-23): `automax-55b5e` está na conta do proprietário da empresa. Falta só a decisão de publicar regras (`firebase deploy --only firestore:rules,storage`) e site.
4. **Cadastrar o primeiro admin** (documento em `admins/{uid}`) e **migrar cadastros de suporte antigos**, apagando os CPFs já gravados (ver `FIRESTORE_RULES.md`).
5. **Avaliar o incidente** registrado em `incidents/log.md` (token e regras abertas no site antigo).
6. Revisão jurídica da política e dos termos.
7. Criar e-mail `privacidade@<domínio>` quando houver domínio próprio.
8. Conferir no console: região do Firestore, aceite do adendo de dados do Google Cloud.

## Técnicas (próximos PRs)
9. Backend do formulário de demonstração (`enviarLead`): gravar em `leads` + `consentimentos` e avisar o comercial.
10. Rotina de exclusão de leads com mais de 12 meses.
11. Remover o CPF dos documentos antigos de `suportes` (script de migração).
12. `robots.txt` com `noindex` para `/cliente`, `/suporte`, `/kanban` (thread de SEO).
