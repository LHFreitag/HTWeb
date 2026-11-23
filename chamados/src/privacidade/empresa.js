/* Dados do controlador (LGPD, art. 5º, VI e art. 9º).
   Usados na Política de Privacidade, nos Termos de Uso e no rodapé.

   ⚠ PREENCHER antes de publicar: todo campo com valor null aparece no site como
   "[a preencher: ...]" em destaque, para ninguém esquecer. */
import { CONTATO } from '../site/contato';

export const EMPRESA = {
  nomeFantasia: 'House Tech Sistemas',
  razaoSocial: null,          // ex.: 'House Tech Sistemas Ltda.'
  cnpj: null,                 // ex.: '00.000.000/0001-00'
  endereco: null,             // ex.: 'Rua X, 123, Bairro, Cuiabá - MT, CEP 78000-000'
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
  nome: null,                          // ex.: 'Fulano de Tal' (ou deixe null se a empresa dispensou)
  email: CONTATO.email,                // ideal: privacidade@<domínio próprio>
};

/* Prazo de guarda dos pedidos de demonstração sem negócio fechado. */
export const PRAZO_LEADS_MESES = 12;

/* Data da versão dos textos legais. Atualize sempre que mudar a política ou os termos. */
export const VERSAO_POLITICA = '2026-11-23';
