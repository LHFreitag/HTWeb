# Runbook de incidente com dados pessoais

1. **T+0**: anotar data/hora em que a empresa soube do incidente em `log.md`.
2. **Conter**: trocar senhas, revogar sessões no Firebase Auth, tirar acessos em `admins`/`suportes`, endurecer regras.
3. **Preservar evidências**: exportar logs do Firebase/Google Cloud.
4. **Avaliar (Res. 15/2024, art. 5º)**: há risco ou dano relevante **e** envolve dados de autenticação, financeiros, sensíveis, de menores/idosos, sigilosos ou em larga escala?
5. **Se sim, comunicar** ANPD e titulares em até 3 dias úteis (ATPP: 6 dias úteis), pelo formulário da ANPD.
6. **Registrar** todo incidente, comunicado ou não, em `log.md` por no mínimo 5 anos (art. 10).

Exemplo real a considerar: o token de admin `VITE_ADMIN_TOKEN` esteve no JavaScript público e as regras antigas do Firestore permitiam leitura e alteração por qualquer pessoa. Se o site antigo esteve no ar com dados reais, **avaliar se houve acesso indevido** e registrar a avaliação em `log.md`.
