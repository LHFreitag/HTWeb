/* Contato do comercial da House Tech.
   O número vai no formato 55 + DDD + número, só dígitos. Com ele, cada botão abre o WhatsApp
   já com a mensagem certa escrita (wa.me/<número>?text=...). */
export const CONTATO = {
  whatsapp: '556599340033',
  email: 'housetechcba@gmail.com',
};

export const MENSAGENS_WA = {
  produtos: 'Olá! Estou entrando em contato pelo site da House Tech. Tenho interesse nos produtos de vocês e quero conhecer mais.',
  automax: 'Olá! Estou entrando em contato pelo site da House Tech e quero conhecer mais sobre o Automax.',
  mettre: 'Olá! Estou entrando em contato pelo site da House Tech e quero conhecer mais sobre o Mettre.',
  geral: 'Olá! Estou entrando em contato pelo site da House Tech e gostaria de falar com a área comercial.',
};

export function waURL(texto) {
  return `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export function waLink(chave) {
  return waURL(MENSAGENS_WA[chave] || MENSAGENS_WA.geral);
}

/**
 * Pedido de demonstração vindo do formulário do site.
 *
 * TODO(backend): enviar o lead para o comercial automaticamente, sem o cliente precisar clicar.
 *   - e-mail para CONTATO.email (housetechcba@gmail.com)
 *   - mensagem de WhatsApp para o número do comercial
 *   - avisar só o comercial (não o suporte)
 * Caminho sugerido: uma Cloud Function (ou webhook do Make/n8n) que recebe este objeto e dispara
 * os dois avisos. Enquanto isso não existe, esta função não envia nada: o cliente vê a tela de
 * sucesso e o botão "Adiantar a conversa no WhatsApp" com o resumo já escrito.
 *
 * @param {{produto: string, nome: string, whatsapp: string, cidade: string, email: string,
 *          unidades: string, sistemaAtual: string, resumo: string}} lead
 */
export async function enviarLead(lead) {
  if (import.meta.env.DEV) console.info('[lead] pedido de demonstração (ainda não enviado):', lead);
  return { enviado: false };
}
