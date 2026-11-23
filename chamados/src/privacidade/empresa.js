/* Dados do controlador (LGPD, art. 5º, VI e art. 9º).
   Usados na Política de Privacidade, nos Termos de Uso e no rodapé.

   Dados conferidos no cadastro do CNPJ em 2026-11-23: Microempresa (ME), optante do Simples,
   situação ativa. Todo campo com valor null aparece no site como "[a preencher: ...]" em destaque. */
import { CONTATO } from '../site/contato';

export const EMPRESA = {
  nomeFantasia: 'House Tech Sistemas',
  razaoSocial: 'L. V. Freitag Sistemas e Consultoria',
  cnpj: '30.846.822/0001-59',
  // Endereço registrado no CNPJ (Receita Federal, consulta de 2026-11-23). Se o CNPJ for
  // atualizado para o novo escritório, troque aqui também.
  endereco: 'Avenida das Palmeiras, 144, Casa 127, Quadra F, Lote 87, Jardim Imperial, Cuiabá - MT, CEP 78075-900',
  cidade: 'Cuiabá - MT',
  whatsapp: CONTATO.whatsapp,
  whatsappExibicao: '(65) 9934-0033',
  emailComercial: CONTATO.email,
};

/* Encarregado pelo tratamento de dados pessoais (LGPD, art. 41).
   Agentes de pequeno porte podem dispensar a indicação do encarregado
   (Resolução CD/ANPD nº 2/2022, art. 11), mas precisam manter um canal de
   comunicação com o titular. Se houver encarregado nomeado, preencha o nome. */
export const ENCARREGADO = {
  nome: null,                          // null = dispensa de ATPP (empresa é ME); preencha se quiser nomear encarregado
  email: CONTATO.email,                // ideal: privacidade@<domínio próprio>
};

/* Prazo de guarda dos pedidos de demonstração sem negócio fechado. */
export const PRAZO_LEADS_MESES = 12;

/* Data da versão dos textos legais. Atualize sempre que mudar a política ou os termos. */
export const VERSAO_POLITICA = '2026-11-23';
