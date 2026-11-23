# Regras do Firestore e do Storage

As regras ficam versionadas em `firestore.rules` e `storage.rules` (referenciadas no `firebase.json`).
Elas são a principal proteção dos dados pessoais do site (LGPD, art. 46): mesmo que alguém abra o
JavaScript do site, o banco só entrega o que cada papel pode ver.

> ⚠️ Não publique enquanto não estiver confirmado qual projeto Firebase é o da House Tech
> (o `.firebaserc` aponta para `automax-55b5e`).

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

Cadastros novos de suporte usam o **UID do login como ID do documento** em `suportes`. As regras
usam isso para saber quem é equipe. Cadastros antigos (criados com ID aleatório) continuam
fazendo login, mas **não conseguem ler chamados** até serem migrados:

1. Em **Authentication**, copie o UID da pessoa.
2. Em **Firestore → suportes**, crie um documento com ID = UID e copie os campos do antigo
   (`nome`, `email`, `telefone`, `experiencia`, `status`, `dataCadastro`). **Não copie o `cpf`.**
3. Apague o documento antigo (isso também elimina o CPF que era coletado antes).

## Testar as regras

```bash
npm run test:rules   # sobe o emulador local (precisa de Java 21) e roda tests/firestore-rules.test.mjs
```

## Publicar (quando o projeto estiver confirmado)

```bash
firebase deploy --only firestore:rules,storage
```
