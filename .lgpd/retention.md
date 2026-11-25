# Matriz de retenção

| Registro | Prazo | Fundamento | Marco inicial | Depois do prazo |
|---|---|---|---|---|
| Leads sem negócio (`leads`, conversas de WhatsApp) | 12 meses | Art. 15, I (finalidade alcançada) | data do pedido | eliminar |
| Leads que viraram cliente | durante o contrato | Art. 7º, V | — | segue regra de cliente |
| Consentimento de marketing (`consentimentos`) | enquanto ativo + 5 anos do evento de revogação | Art. 8º, § 2º (ônus da prova) e art. 7º, VI | data do evento | eliminar |
| Chamados (`chamados`) | contrato + até 5 anos, só o mínimo, bloqueado | Art. 7º, VI; CDC art. 27 | fim do contrato | eliminar |
| Cadastro de suporte (`suportes`) | enquanto na equipe | Art. 15 | saída da equipe | eliminar (inclusive CPFs antigos já gravados) |
| Registros de acesso (Hosting) | 6 meses | Marco Civil, art. 15 | data do acesso | eliminação automática do provedor (confirmar configuração) |
| Cookies opcionais | até 13 meses (GA) / 3 meses (Pixel) | Consentimento | gravação | expiram; banner pede de novo após 12 meses |
| Registro de incidentes (`incidents/log.md`) | mínimo 5 anos | Res. 15/2024, art. 10 | registro | — |
| Documentos fiscais de clientes | 5 anos | CTN art. 173, I | 1º dia do exercício seguinte | fora deste site |

**Implementação pendente**: rotina (Cloud Function agendada ou revisão manual trimestral) para apagar `leads` com mais de 12 meses. Propagar exclusões a operadores (art. 18, § 6º).
