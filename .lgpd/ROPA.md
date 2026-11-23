# Registro das Operações de Tratamento (art. 37) — rascunho para revisão

Controlador: [a preencher: razão social / CNPJ] — House Tech Sistemas
Canal do titular: housetechcba@gmail.com · WhatsApp (65) 9934-0033

| Operação | Finalidade | Base legal | Titulares | Categorias de dados | Compartilhamento | Transferência internacional | Retenção | Segurança |
|---|---|---|---|---|---|---|---|---|
| Pedidos de demonstração | contato comercial e proposta | 7º, V | potenciais clientes | identificação, contato, perfil do negócio | Meta (WhatsApp); Google (se gravar em `leads`) | EUA — 33, II/IX | 12 meses sem negócio | regras Firestore (só admin lê) |
| Marketing | novidades e ofertas | 7º, I | quem marcou a caixa | contato + evento de consentimento | Meta (WhatsApp) | EUA | até revogação | ledger append-only |
| Atendimento WhatsApp | atendimento | 7º, V e IX | visitantes/clientes | contato, mensagens | Meta | EUA — 33, IX | 12 meses (leads) / contrato | acesso restrito ao aparelho do comercial |
| Chamados de suporte | suporte técnico | 7º, V | clientes | contato, descrição | Google | conferir região | contrato + 5 anos (mínimo) | só equipe aprovada lê |
| Equipe de suporte | controle de acesso | 7º, V e IX | colaboradores | identificação, contato, credenciais | Google | conferir região | enquanto na equipe | Auth + regras |
| Registros de acesso | segurança / Marco Civil | 7º, II | visitantes | IP, data/hora, navegador | Google | EUA | 6 meses | provedor |
| Cookies de estatística | medir visitas | 7º, I | visitantes que aceitaram | identificadores online | Google | EUA — 33, II | até 13 meses | só após aceite |
| Cookies de marketing | remarketing | 7º, I | visitantes que aceitaram | identificadores online | Meta | EUA — 33, II | até 3 meses | só após aceite |

⏸ **CHECKPOINT**: a empresa deve revisar e confirmar este registro antes de publicar a política.
