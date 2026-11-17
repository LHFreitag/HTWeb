/* Conteúdo dos produtos, copiado do modelo aprovado.
   As telas ficam em public/assets/<dir>/<arquivo>.jpg (dir padrão: automax). */
export const PRODUTOS = {
  automax: {
    key: "automax", nome: "Automax", para: "lojas e varejo", icon: "i-store",
    heroTitle: 'Sua loja vendendo mais, <em>do caixa ao contador</em>.',
    heroFact: ['NF-e, NFC-e e MDF-e', 'Pix dinâmico e TEF', 'Pronto para IBS e CBS'],
    lpFact: ['NF-e e NFC-e', 'PDV com Pix e TEF', 'Demonstração de 30 min'],
    heroLead: "Caixa com Pix e TEF, estoque com custo real, cobrança com boleto e nota fiscal já pronta para a Reforma Tributária. Tudo num só sistema, com implantação em até 5 dias úteis.",
    hubImg: ["pagamentos_tef_pix_nfce", "Tela real do Automax: Frente de Caixa com TEF, PIX dinâmico e NFC-e"],
    hubShots: [
      ["reforma_tributaria", "Pronto para a Reforma Tributária", "CST, classificação e alíquotas de CBS e IBS em cada produto."],
      ["contas_a_receber", "Cobrança que não esquece ninguém", "Boleto, remessa, carnê e vencidos em vermelho."],
      ["ordem_de_servico", "Ordem de serviço sem papel", "Equipamento, defeito e orçamento enviado para aprovação."]
    ],
    lpTitle: 'Sua loja vendendo mais, <em>sem susto com o fisco</em>.',
    lpLead: "Caixa com Pix e TEF, estoque com custo real, financeiro que cobra por você e nota fiscal já preparada para a Reforma Tributária. Tudo no Automax, com implantação em até 5 dias úteis.",
    heroImg: ["pagamentos_tef_pix_nfce", "Tela real do Frente de Caixa do Automax com TEF, PIX dinâmico e NFC-e"],
    segs: ["Roupas e calçados", "Mercados", "Autopeças", "Materiais de construção", "Pet shops", "Assistências técnicas"],
    feats: [
      ["Caixa rápido e sem fila", "PDV operado pelo teclado, com leitor de código, Pix dinâmico, TEF e NFC-e. Abertura, sangria e fechamento protegidos por senha.", "Menos fila no caixa"],
      ["Estoque com custo real", "Cadastro com NCM, marca e formação de preço. Entrada de mercadoria pelo XML da nota do fornecedor, sem redigitar.", "Preço certo, margem certa"],
      ["Financeiro que cobra por você", "Contas a pagar e receber, boleto com remessa e retorno, carnê e conciliação de cartões.", "Menos inadimplência"],
      ["Fiscal completo e pronto para a reforma", "NF-e, NFC-e, MDF-e, carta de correção, manifestação, SPED e os novos campos de CBS e IBS.", "Zero susto com o fisco"],
      ["Ordem de serviço e produção", "O.S. com aprovação de orçamento, produção por etapas e expedição de pedidos.", "Serviço sem papel perdido"],
      ["Gestão com números de verdade", "DRE gerencial, fluxo de caixa realizado + previsto, balanço e controle de acesso por usuário.", "Decisão com dados"]
    ],
    integr: ["NF-e / NFC-e", "MDF-e", "IBS / CBS", "Pix dinâmico", "TEF", "Boleto com remessa e retorno", "Manifestação de NF-e", "SPED", "Contador (XML)"],
    tour: [
      ["reforma_tributaria", "Reforma Tributária", "A Reforma Tributária já começou. Seu sistema está pronto?", "Em 2026 começou a fase de testes da CBS e do IBS. A partir de 2027, a CBS passa a valer de verdade. No Automax, cada produto já tem os campos da reforma prontos para você só conferir.", "Sistema desatualizado na transição significa nota rejeitada, venda parada e risco de multa.", ["CST e classificação tributária IBS/CBS em cada produto", "Alíquotas de CBS, IBS estadual e IBS municipal", "Regras copiadas do último cadastro com um clique"], "Atravesse a reforma sem parar de vender"],
      ["frente_de_caixa", "Frente de caixa", "Cliente com pressa não espera. O seu caixa também não.", "Pix dinâmico, TEF e NFC-e no mesmo PDV. O operador vende pelo teclado, lê o código de barras e fecha a venda sem trocar de tela.", "Cada minuto de fila é um cliente pensando em ir embora.", ["TEF e Pix dinâmico integrados, sem digitar valor na maquininha", "NFC-e emitida e reimpressa no próprio caixa", "Abertura, sangria, suprimento e fechamento com senha"], "Menos fila, menos erro de troco"],
      ["contas_a_receber", "Financeiro", "Pare de esquecer quem está te devendo.", "Os títulos vencidos aparecem em vermelho logo na abertura da tela. Gere boleto, carnê e arquivo de remessa para o banco ali mesmo, e parcele uma venda em segundos.", "Conta a receber esquecida é dinheiro que você já perdeu e ainda não sabe.", ["Boleto com remessa e retorno bancário", "Carnê para o seu crediário", "Parcelamento automático, mês a mês"], "Menos inadimplência, caixa previsível"],
      ["formacao_de_preco", "Formação de preço", "Saiba quanto você lucra antes de vender.", "Informe o custo da nota, frete, IPI e impostos. O Automax calcula o custo final, sugere o preço pela sua margem e mostra o lucro real de cada produto na hora.", "Preço no chute faz você vender muito e lucrar pouco.", ["Custo final com IPI, frete, ICMS e outros custos", "Preço sugerido a partir da margem desejada", "Limite de desconto por produto"], "Margem protegida em cada venda"],
      ["ordem_de_servico", "Ordem de serviço", "Do orçamento à entrega, sem papel perdido.", "Registre o equipamento, número de série, acessórios e defeito. Envie o orçamento para aprovação do cliente e acompanhe o prazo e a prioridade de cada O.S.", "Orçamento de papel some, e o cliente liga para perguntar o que já devia saber.", ["Envio do orçamento para aprovação", "Peças, mão de obra e serviços de terceiros", "Histórico completo de cada atendimento"], "Cliente informado, técnico organizado"],
      ["fluxo_de_caixa", "Gestão financeira", "Feche o mês sabendo se deu lucro.", "Fluxo de caixa realizado + previsto, DRE gerencial e balanço patrimonial prontos. Você enxerga o saldo de cada dia antes de o dia chegar.", "Quem só olha o extrato descobre o buraco quando já caiu nele.", ["Fluxo de caixa dia a dia, com o que entra e o que sai", "DRE gerencial por período", "Balanço e bens patrimoniais com depreciação"], "Decisão com número, não com palpite"]
    ],
    gallery: [
      ["estoque", "Estoque com custo e NCM", "Quantidade, preço, custo, desconto máximo e marca numa só tela."],
      ["nfe", "NF-e completa", "DANFE, e-mail, XML, carta de correção, devolução e manifestação."],
      ["relatorios_gerenciais", "Relatórios gerenciais", "DRE, fluxo de caixa, balanço, vendas, compras e comissões."],
      ["usuarios_permissoes", "Cada um vê o que deve ver", "Usuários, perfis, permissões e log de quem fez o quê."]
    ],
    faq: [
      ["Funciona para o meu tipo de loja?", "O Automax atende de lojas de roupa a autopeças e mercados, com grade de tamanho e cor, código de barras, validade e lote."],
      ["Preciso de certificado digital?", "Para emitir NF-e e NFC-e, sim. Se você não tiver, ajudamos a emitir o seu durante a implantação."],
      ["O Automax já está pronto para a Reforma Tributária?", "Sim. O cadastro de produtos já tem CST, classificação tributária e alíquotas de CBS e IBS. Na demonstração mostramos como isso aparece na sua nota."],
      ["Consigo emitir boleto e controlar o crediário?", "Sim. O Automax gera boleto, arquivo de remessa e retorno para o banco e carnê para vendas parceladas, com os vencidos em destaque."],
      ["E se a internet cair?", "O caixa continua vendendo e emite a nota em contingência. Quando a conexão volta, tudo é sincronizado."]
    ]
  },
  mettre: {
    key: "mettre", nome: "Mettre", para: "restaurantes e lanchonetes", icon: "i-food",
    heroTitle: 'Pedido certo na cozinha, <em>caixa certo no fim da noite</em>.',
    heroFact: ['Balcão, mesa e delivery', 'iFood integrado', '9 formas de pagamento'],
    heroLead: "Balcão, mesas e delivery com iFood no mesmo sistema. Cada pedido sai na impressora certa, da cozinha ao bar, e o caixa fecha com 9 formas de pagamento.",
    hubImg: ["01_venda_balcao", "Tela real do Mettre: venda no balcão com pizzas, chopp e bebidas"],
    hubShots: [
      ["03_delivery", "Delivery pelo telefone do cliente", "Nome, endereço e taxa de entrega aparecem na hora."],
      ["02_recebimento", "9 formas de pagamento", "Divida a conta entre dinheiro, cartão, ticket, convênio e pendura."],
      ["05_cadastro_produto", "Cada item na impressora certa", "Cozinha, copa ou bar definidos no cadastro do produto."]
    ],
    lpTitle: 'Pedido certo na cozinha, <em>caixa certo no fim da noite</em>.',
    lpLead: "Balcão, mesas e delivery no mesmo sistema, com iFood integrado, pedido impresso direto na cozinha, na copa ou no bar e um caixa que aceita 9 formas de pagamento. Implantação em até 5 dias úteis.",
    lpFact: ['Balcão, mesa e delivery', 'iFood integrado', 'Demonstração de 30 min'],
    dir: "mettre", lugar: "seu restaurante", ctaMini: "Ver isso no meu restaurante", bandTail: "o cardápio do seu restaurante",
    tourHead: "Não é maquete. É o sistema que o seu restaurante vai usar.",
    heroImg: ["01_venda_balcao", "Tela real do Mettre: venda no balcão com pizzas, chopp e bebidas"],
    urgency: ["Restaurante também entra na Reforma Tributária.", "A CBS passa a valer em 2027, e cada cupom vai precisar dos novos campos. O Mettre já grava CBS e IBS nas vendas do balcão, das mesas e do delivery. Na demonstração, mostramos como fica o seu cupom."],
    tour: [
      ["01_venda_balcao", "Balcão", "Fila no balcão é cliente indo para o concorrente.", "Pizza, chopp e refrigerante no mesmo pedido, lançados pelo código e pela quantidade. Se o cliente ainda vai pedir mais, a venda fica em espera e o caixa atende o próximo.", "Na sexta à noite, cada minuto parado no caixa é um pedido a menos.", ["Lançamento por código, com a quantidade na hora", "Venda em espera (F2) para não travar a fila", "Atalhos de teclado para receber, cancelar e trocar de tela"], "Mais pedidos por hora no pico"],
      ["02_recebimento", "Recebimento", "Cada cliente paga do jeito que quiser.", "Dinheiro, cheque, cartão, ticket, contra vale, pendura, consumo de funcionário, cortesia e convênio na mesma tela. O Mettre divide o pagamento e mostra na hora o troco ou o que ainda falta.", "Conta dividida na calculadora é troco errado e caixa que não fecha.", ["9 formas de pagamento na mesma venda", "Pendura e convênio controlados por cliente", "Cortesia e consumo de funcionário registrados, não esquecidos"], "Caixa que fecha certo no fim da noite"],
      ["03_delivery", "Delivery", "O cliente liga e você já sabe para onde vai o pedido.", "Digite o telefone e o Mettre traz nome, endereço e taxa de entrega do cliente. O pedido nasce com o horário, o tempo de preparo e o total já com a entrega.", "Anotar endereço no papel no meio do pico é pedido indo para o lugar errado.", ["Cliente encontrado pelo telefone, ou cadastrado em segundos", "Taxa de entrega por cliente", "Horário do pedido e tempo de preparo à vista"], "Entrega certa, cliente que volta"],
      ["04_delivery_ifood", "iFood e entregadores", "iFood, entregador e pedido repetido no mesmo menu.", "Os pedidos do iFood entram pelo próprio Mettre. O cliente de sempre quer o mesmo de sempre? Repita o último pedido com Ctrl+R. E cada entrega sai com o entregador definido.", "Redigitar pedido do aplicativo é erro na cozinha e prato devolvido.", ["Integração com o iFood", "Repetir o último pedido com um atalho", "Entregador escolhido em cada pedido"], "Delivery que anda sem correria"],
      ["05_cadastro_produto", "Cardápio", "Cada item sai na impressora certa.", "No cadastro do produto você define se ele vai para a cozinha, para a copa ou para o bar, se cobra taxa de serviço, se entra no happy hour e se gera comissão para o garçom.", "Pedido de bebida impresso na cozinha é cliente esperando à toa.", ["Local de impressão: cozinha, copa 1, 2 e 3 ou bar", "Happy hour, taxa de serviço e comissão por produto", "Composição do produto para baixar os insumos"], "Cozinha e bar recebendo só o que é deles"],
      ["06_produtos_vendidos", "Gestão", "Saiba o que está saindo antes de fechar o caixa.", "Com o caixa ainda aberto, veja quanto vendeu de cada produto, separado por grupo: pizzas, bebidas, comidas. E imprima o relatório com uma tecla.", "Descobrir no dia seguinte que o chopp acabou é venda que não volta.", ["Produtos vendidos por grupo, em tempo real", "Todos os caixas abertos de uma vez", "Histórico por data de fechamento"], "Decisão no meio do turno, não no dia seguinte"],
      ["07_tributacao", "Fiscal", "NFC-e sem dor de cabeça com o contador.", "Cada produto já leva CFOP, CST e ICMS por tipo de operação e o código de gênero do SPED Fiscal. A nota sai certa e o contador recebe tudo organizado.", "Tributação errada no cadastro vira nota rejeitada bem na hora de fechar a conta.", ["Tributação por CFOP em cada produto", "Regras copiadas de outro produto em um clique", "Código de gênero do SPED Fiscal"], "Nota certa, contador tranquilo"]
    ],
    gallery: [],
    segs: ["Restaurantes", "Lanchonetes", "Pizzarias", "Hamburguerias", "Bares", "Padarias"],
    feats: [
      ["Comanda no celular", "O garçom lança o pedido na mesa e ele chega na cozinha na hora. A conta fecha com divisão por pessoa.", "Mais giro de mesa"],
      ["Delivery sem redigitar", "Pedidos do iFood, do WhatsApp e do seu site caem na mesma tela e vão direto para a produção.", "Menos erro no pico"],
      ["Tela da cozinha", "Os pedidos aparecem em ordem, com tempo de preparo. O que atrasou fica em vermelho.", "Prato no tempo certo"],
      ["Custo de cada prato", "A ficha técnica baixa os ingredientes do estoque e mostra o custo e a margem de cada item do cardápio.", "Cardápio que dá lucro"],
      ["Caixa e NFC-e", "Fechamento do caixa, sangria, NFC-e e acerto com garçons e entregadores.", "Dia fechado em minutos"],
      ["Relatórios no celular", "Prato mais vendido, horário de pico e ticket médio, de onde você estiver.", "Decisão com dados"]
    ],
    integr: ["iFood", "WhatsApp", "Cardápio digital", "NFC-e", "Pix", "TEF", "Maquininhas", "Balanças", "Impressora de cozinha"],
    faq: [
      ["O suporte atende à noite e no fim de semana?", "O atendimento pode acompanhar o horário do restaurante, inclusive à noite e nos fins de semana. Isso é combinado na sua proposta."],
      ["Preciso comprar tablets para os garçons?", "Não. A comanda funciona no celular Android que a equipe já tem."],
      ["Integra com o iFood?", "Sim. Os pedidos chegam sozinhos, o cardápio fica sincronizado e o status é atualizado para o cliente."],
      ["Funciona para pizzaria, com pizza pequena, média e grande?", "Sim. Cada tamanho tem o seu preço e o cardápio fica organizado por grupo, como pizza grande, pizza média, bebidas e sobremesas."],
      ["Aceita ticket, convênio e conta pendurada?", "Sim. O recebimento tem 9 formas de pagamento, entre elas ticket, convênio, pendura de cliente, consumo de funcionário e cortesia, e você pode dividir a conta entre elas."]
    ]
  }
};
