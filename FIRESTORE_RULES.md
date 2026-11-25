# Regras do Firestore e do Storage

As regras ficam versionadas em `firestore.rules` e `storage.rules` (referenciadas no `firebase.json`).
Elas são a principal proteção dos dados pessoais do site (LGPD, art. 46): mesmo que alguém abra o
JavaScript do site, o banco só entrega o que cada papel pode ver.

> O projeto Firebase `automax-55b5e` (no `.firebaserc`) é da empresa, na conta do proprietário (confirmado em 2026-11-23).
> Antes de publicar as regras, cadastre o primeiro admin e migre os cadastros de suporte antigos (abaixo),
> senão a equipe atual perde o acesso ao Kanban.

## Quem pode o quê

| Coleção | Visitante | Suporte aprovado | Admin |
|---|---|---|---|
| `chamados` | só criar (campos e tamanhos limitados) | ler e atualizar | tudo |
| `suportes` | nada | ler o próprio cadastro; criar o próprio pedido (`id = uid`) | tudo |
| `admins` | nada | ler o próprio documento (para saber se é admin) | ler o próprio; criar só pelo console |
| `novidades`, `treinamentos` | ler | ler | tudo |
| `leads` (pedidos de demonstração) | só criar | nada | tudo |
| `consentimentos` (registro de consentimento) | só criar | nada | ler; **ninguém edita nem apaga** |
| qualquer outra | nada | nada | nada |

## Como liberar um administrador

O token `VITE_ADMIN_TOKEN` foi removido: ele ia dentro do JavaScript público do site e qualquer
pessoa podia lê-lo. Agora o painel (`/suporte`, `/suporte/autoriza`, `/suporte/novidades`,
`/suporte/treinamentos`) pede login do Firebase Auth.

1. A pessoa cria a conta (e-mail e senha ou Google) — por exemplo, entrando em `/suporte`.
2. No [console do Firebase](https://console.firebase.google.com/) → **Authentication** → copie o **UID** dela.
3. **Firestore** → coleção `admins` → **Adicionar documento** com o ID = UID copiado
   (pode ter um campo `nome` só para identificação).
4. Pronto: no próximo login ela entra no painel. Para tirar o acesso, apague o documento.

## Migração dos cadastros de suporte antigos

Cadastros novos de suporte usam o **UID do login como ID do documento** em `suportes`, e as regras
usam isso para saber quem é equipe. Os cadastros antigos (ID aleatório) precisam ser copiados para
`suportes/{uid}` **antes de publicar as regras**, senão a equipe entra mas vê o Kanban vazio.

O script `scripts/migrar-suportes.mjs` faz isso:

1. No console do Firebase → ⚙️ **Configurações do projeto** → **Contas de serviço** → **Gerar nova chave privada**.
   Salve o arquivo `.json` fora da pasta do projeto (ele dá acesso total ao banco; nunca envie nem commite).
2. Na raiz do projeto, aponte para a chave e rode a **simulação** (não grava nada, só mostra o que faria
   e salva um backup em `backup-lgpd/`):
   ```bash
   # Windows (PowerShell)
   $env:GOOGLE_APPLICATION_CREDENTIALS="C:\caminho\da\chave.json"
   npm run migrar:suportes
   ```
3. Se o resultado estiver certo, aplique. Escolha uma das opções:
   ```bash
   npm run migrar:suportes -- --executar                    # copia sem CPF e mantém os antigos (com CPF)
   npm run migrar:suportes -- --executar --apagar-antigos   # copia sem CPF e apaga os antigos (o CPF deixa de existir)
   ```
   `--manter-cpf` copia o CPF para o documento novo (não recomendado).
4. Cadastros cujo e-mail não tem conta de login são listados no fim e ficam como estão.
5. Quando não precisar mais, apague a pasta `backup-lgpd/` (tem dados pessoais) e revogue a chave
   em **Contas de serviço** (ou apague o arquivo).

Chamados, novidades, treinamentos e contas de login não são alterados pelo script.

## Testar as regras

```bash
npm run test:rules   # sobe o emulador local (precisa de Java 21) e roda tests/firestore-rules.test.mjs
```

## Publicar

```bash
firebase deploy --only firestore:rules,storage
```
