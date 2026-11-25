/* Consentimento para novidades e ofertas (LGPD, art. 7º, I e art. 8º).

   Segue o modelo de "ledger" de eventos imutáveis: cada concessão ou revogação vira um
   evento novo (GRANTED / REVOKED), nunca uma edição do anterior. No Firestore, a coleção
   `consentimentos` só aceita criação (ver firestore.rules), o que garante o histórico.

   O pedido de demonstração em si NÃO usa consentimento como base: a base é
   procedimento preliminar a contrato (art. 7º, V). Por isso o consentimento de marketing
   é uma caixa separada, desmarcada, e não condiciona o envio do formulário (art. 8º, § 4º; art. 9º, § 3º). */
import { VERSAO_POLITICA } from './empresa';

export const FINALIDADE_MARKETING = 'marketing_whatsapp_email';

export const TEXTO_CONSENTIMENTO_MARKETING =
  'Quero receber novidades e ofertas da House Tech pelo WhatsApp e por e-mail. Posso cancelar quando quiser.';

/** Monta o evento de consentimento que acompanha o lead. Só é gerado quando a pessoa marcou a caixa. */
export function eventoConsentimento({ tipo = 'GRANTED', canal, pagina }) {
  return {
    tipo,                                   // 'GRANTED' | 'REVOKED'
    finalidade: FINALIDADE_MARKETING,
    versaoPolitica: VERSAO_POLITICA,
    textoApresentado: TEXTO_CONSENTIMENTO_MARKETING,
    canal,                                  // ex.: 'formulario_demonstracao'
    pagina,                                 // ex.: '/mettre'
    ocorridoEm: new Date().toISOString(),
  };
}
