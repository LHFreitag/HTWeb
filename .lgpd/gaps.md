# Pendências (priorizadas)

## Da empresa (não dá para resolver no código)
1. **Preencher** razão social, CNPJ e endereço em `chamados/src/privacidade/empresa.js` (aparecem como "[a preencher]" em destaque).
2. **Confirmar porte (ATPP)**; se não for ATPP, nomear encarregado (preencher `ENCARREGADO.nome`).
3. **Confirmar o projeto Firebase** e só então publicar regras (`firebase deploy --only firestore:rules,storage`) e site.
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
