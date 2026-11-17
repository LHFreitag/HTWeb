import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import DemoForm from '../components/DemoForm';
import Proposta from '../components/Proposta';
import { Em, LiquidType, Marquee, Shot, useSite } from '../components/Shared';
import { IconFood, IconStore, IconZap, StrokeIcon } from '../components/Icons';
import { PRODUTOS } from '../data';
import { waLink } from '../contato';

const SEGMENTOS = ['Mercados', 'Lojas de roupas', 'Autopeças', 'Materiais de construção', 'Pet shops', 'Farmácias', 'Restaurantes', 'Lanchonetes', 'Pizzarias', 'Hamburguerias', 'Bares', 'Padarias'];

const FAQ = [
  ['Quanto tempo leva para começar a usar?', 'Em média 5 dias úteis entre a assinatura e o sistema rodando, com nota fiscal configurada e equipe treinada. Sua loja ou restaurante não precisa parar.'],
  ['Consigo trazer os dados do meu sistema atual?', 'Sim. A nossa equipe importa cadastro de produtos, clientes e fornecedores por planilha ou direto do sistema antigo, sem custo extra.'],
  ['Preciso comprar computador ou equipamento novo?', 'Na maioria dos casos, não. Funciona em computador com Windows 10 ou superior, impressora térmica e internet comum. Na demonstração avaliamos o que você já tem.'],
  ['O sistema já está pronto para a Reforma Tributária?', 'Sim. O Automax e o Mettre já têm os campos de CBS e IBS no cadastro e nas vendas. Na demonstração mostramos como isso aparece na sua nota.'],
  ['E se a internet cair?', 'O caixa continua vendendo e emitindo em contingência. Quando a conexão volta, tudo é sincronizado sozinho.'],
  ['Quanto custa?', 'Depende do seu negócio: quantos computadores e caixas, quantos estabelecimentos e quais recursos você vai usar. Depois de uma conversa rápida com o comercial, você recebe uma proposta com preço fechado.'],
  ['Como funciona o suporte?', 'Pelo site, WhatsApp ou telefone, de segunda a sábado. Todo atendimento gera um protocolo que você acompanha na Área do cliente.'],
  ['Integra com iFood, maquininha e balança?', 'Sim. O Mettre recebe pedidos do iFood e do WhatsApp, e os dois sistemas integram com TEF, maquininhas e balanças dos principais fabricantes.'],
];

function lerEscolha() {
  try {
    const v = localStorage.getItem('ht-pick');
    return v === 'mettre' || v === 'automax' ? v : 'automax';
  } catch {
    return 'automax';
  }
}

function Seletor({ escolha, onPick, compacto = false, labelledBy }) {
  return (
    <div className="seg" role="group" aria-labelledby={labelledBy} aria-label={labelledBy ? undefined : 'Escolha o sistema'} style={compacto ? { maxWidth: 420 } : undefined}>
      <button type="button" aria-pressed={escolha === 'automax'} onClick={() => onPick('automax')}>
        <span className="ico"><IconStore size={compacto ? 18 : 20} /></span>
        {compacto ? <span>Automax · loja</span> : <span>Loja / varejo<small>Automax</small></span>}
      </button>
      <button type="button" aria-pressed={escolha === 'mettre'} onClick={() => onPick('mettre')}>
        <span className="ico"><IconFood size={compacto ? 18 : 20} /></span>
        {compacto ? <span>Mettre · restaurante</span> : <span>Restaurante / lanchonete<small>Mettre</small></span>}
      </button>
    </div>
  );
}

function BotaoDemo({ children, className = 'btn btn-gold' }) {
  const { irParaDemo } = useSite();
  return <a className={className} href="#demo" onClick={irParaDemo}>{children}</a>;
}

function Conteudo() {
  const [escolha, setEscolha] = useState(lerEscolha);
  const p = PRODUTOS[escolha];
  useEffect(() => {
    try { localStorage.setItem('ht-pick', escolha); } catch { /* sem armazenamento */ }
  }, [escolha]);

  return (
    <div className={escolha === 'mettre' ? 'is-mettre' : undefined}>
      <section className="s-hero ht-enter">
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow">House Tech Sistemas</span>
            <h1><Em text={p.heroTitle} /></h1>
            <p className="lead">{p.heroLead}</p>
            <div className="chooser">
              <span className="chooser-label" id="chLbl">Qual é o seu negócio?</span>
              <Seletor escolha={escolha} onPick={setEscolha} labelledBy="chLbl" />
            </div>
            <div className="hero-actions">
              <BotaoDemo className="btn btn-gold btn-lg">Agendar demonstração grátis</BotaoDemo>
              <Link className="btn btn-ghost btn-lg" to={`/${p.key}`}>Conhecer o {p.nome}</Link>
            </div>
            <div className="reassure">{p.heroFact.map((f) => <span key={f}>{f}</span>)}</div>
          </div>
          <div className="ht-enter-media">
            <Shot file={p.hubImg[0]} alt={p.hubImg[1]} dir={p.dir} eager />
            <p className="note" style={{ marginTop: 10 }}><span className="real-tag">Tela real do {p.nome}</span> · dados fictícios de demonstração</p>
          </div>
        </div>
      </section>

      <section className="segband" aria-label="Segmentos atendidos">
        <div className="wrap">
          <p className="note" style={{ fontWeight: 700 }}>Feito para quem tem</p>
          <Marquee itens={SEGMENTOS} speed={34} />
        </div>
      </section>

      <section className="s-section" id="produtos">
        <div className="wrap">
          <div className="section-head">
            <h2>Feitos para a rotina de quem vende no balcão e de quem serve na mesa</h2>
            <p className="lead">Dois sistemas, cada um pensado para o seu negócio, com a mesma equipe de implantação e suporte.</p>
          </div>
          <div className="products">
            <article className="product">
              <div className="product-top"><span className="pmark"><IconStore /></span><div><div className="pname">Automax</div><div className="pfor">Para lojas e varejo</div></div></div>
              <h3>Do caixa ao contador, sem digitar nada duas vezes.</h3>
              <ul className="checks">
                <li>PDV com Pix dinâmico, TEF e NFC-e no mesmo caixa</li>
                <li>Estoque com formação de preço e lucro calculado na hora</li>
                <li>Boleto com remessa e retorno, carnê e vencidos em destaque</li>
                <li>NF-e, MDF-e e os novos campos de CBS e IBS já no cadastro</li>
              </ul>
              <div className="tagrow"><span>Roupas</span><span>Mercados</span><span>Autopeças</span><span>Materiais de construção</span><span>Pet shops</span></div>
              <div className="product-foot">
                <Link className="btn btn-ghost" to="/automax">Ver o Automax</Link>
                <a className="btn btn-gold" href={waLink('automax')} target="_blank" rel="noopener noreferrer"><IconZap size={18} />Quero conhecer o Automax</a>
              </div>
            </article>
            <article className="product mt">
              <div className="product-top"><span className="pmark"><IconFood /></span><div><div className="pname">Mettre</div><div className="pfor">Para restaurantes e lanchonetes</div></div></div>
              <h3>Pedido da mesa, do balcão e do delivery na mesma tela.</h3>
              <ul className="checks">
                <li>Balcão, mesas e delivery no mesmo caixa</li>
                <li>Pedidos do iFood dentro do sistema, sem redigitar</li>
                <li>Cada item impresso na cozinha, na copa ou no bar</li>
                <li>9 formas de pagamento, com pendura, ticket e convênio</li>
              </ul>
              <div className="tagrow"><span>Restaurantes</span><span>Lanchonetes</span><span>Pizzarias</span><span>Hamburguerias</span><span>Bares</span></div>
              <div className="product-foot">
                <Link className="btn btn-ghost" to="/mettre">Ver o Mettre</Link>
                <a className="btn btn-gold" href={waLink('mettre')} target="_blank" rel="noopener noreferrer"><IconZap size={18} />Quero conhecer o Mettre</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="s-section alt" id="telas">
        <div className="wrap">
          <div className="section-head center">
            <span className="real-tag">Telas reais, não maquete</span>
            <h2>Veja o {p.nome} por dentro, <em>antes de falar com a gente</em></h2>
            <p className="lead">Estas telas foram capturadas do sistema funcionando, com dados de demonstração. Na demo, o consultor mostra tudo isso com a rotina do seu negócio.</p>
            <Seletor escolha={escolha} onPick={setEscolha} compacto />
          </div>
          <div className="gallery gallery-3">
            {p.hubShots.map(([file, titulo, texto]) => (
              <figure key={file}>
                <Shot file={file} alt={titulo} dir={p.dir} />
                <figcaption><b>{titulo}</b>{texto}</figcaption>
              </figure>
            ))}
          </div>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <BotaoDemo className="btn btn-gold btn-lg">Quero ver com o meu negócio</BotaoDemo>
            <Link className="btn btn-ghost btn-lg" to={`/${p.key}`}>Ver todas as telas do {p.nome}</Link>
          </div>
        </div>
      </section>

      <section className="s-section">
        <div className="wrap">
          <div className="section-head">
            <h2>Planilha, caderno e sistema que trava custam caro no fim do mês</h2>
          </div>
          <div className="vs">
            <div className="vs-col bad">
              <h3>Sem um sistema integrado</h3>
              <ul>
                <li><span><b>Fila no caixa</b> porque a nota demora ou a maquininha não conversa com o sistema.</span></li>
                <li><span><b>Produto em falta</b> que você só descobre quando o cliente pede.</span></li>
                <li><span><b>Pedido errado na cozinha</b> por causa de comanda de papel e redigitação do iFood.</span></li>
                <li><span><b>Fim do mês no escuro</b>, sem saber o que deu lucro e o que deu prejuízo.</span></li>
                <li><span><b>Conta a receber esquecida</b> no caderno, e o dinheiro que nunca volta.</span></li>
              </ul>
            </div>
            <div className="vs-col good">
              <h3>Com Automax ou Mettre</h3>
              <ul>
                <li><span><b>Venda fechada em segundos</b>, com NFC-e, Pix e cartão na mesma tela.</span></li>
                <li><span><b>Estoque mínimo por produto</b>, para repor antes de faltar.</span></li>
                <li><span><b>Pedido impresso no lugar certo</b>, na cozinha, na copa ou no bar, venha do balcão, da mesa ou do iFood.</span></li>
                <li><span><b>Fluxo de caixa e DRE prontos</b>, para fechar o mês sabendo se deu lucro.</span></li>
                <li><span><b>Vencidos em vermelho</b>, com boleto e carnê gerados na hora.</span></li>
              </ul>
            </div>
          </div>
          <Urgencia
            titulo="Sua nota fiscal vai mudar. O seu sistema está pronto?"
            texto="Em 2026 começou a fase de testes da CBS e do IBS, e em 2027 a CBS passa a valer. O Automax e o Mettre já têm os novos campos. Na demonstração, mostramos como fica a sua nota."
          />
        </div>
      </section>

      <section className="s-section" id="como">
        <div className="wrap">
          <div className="section-head">
            <h2>Do primeiro contato ao sistema rodando em poucos dias</h2>
          </div>
          <div className="steps">
            <div className="stepc"><span className="fi"><StrokeIcon><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></StrokeIcon></span><span className="when">Hoje</span><h3>Demonstração de 30 minutos</h3><p>Um consultor mostra o sistema com o seu tipo de negócio e tira suas dúvidas. Sem compromisso.</p></div>
            <div className="stepc"><span className="fi"><StrokeIcon><path d="M4 7h16M4 12h10M4 17h7" /><path d="m15 17 2 2 4-4" /></StrokeIcon></span><span className="when">Em até 5 dias úteis</span><h3>Implantação com a nossa equipe</h3><p>Levamos seus produtos e clientes do sistema antigo, configuramos a nota fiscal e treinamos sua equipe.</p></div>
            <div className="stepc"><span className="fi"><StrokeIcon><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /></StrokeIcon></span><span className="when">Todo dia</span><h3>Suporte de gente que conhece o sistema</h3><p>Chamado pelo site, WhatsApp ou telefone, com protocolo e acompanhamento até resolver.</p></div>
          </div>
        </div>
      </section>

      <section className="s-section alt statement" id="clientes">
        <div className="wrap">
          <div className="section-head mo-lt" style={{ maxWidth: 'none' }}>
            <LiquidType>Loja e lanchonete? <em>Uma empresa cuida dos dois</em>.</LiquidType>
            <p className="lead">Tem loja e lanchonete no mesmo endereço, como padaria ou conveniência? Você fica com uma empresa só, uma implantação para os dois sistemas e o mesmo suporte, que conhece os dois.</p>
            <div className="hero-actions"><BotaoDemo className="btn btn-gold btn-lg">Agendar demonstração</BotaoDemo></div>
          </div>
        </div>
      </section>

      <section className="s-section" id="suporte">
        <div className="wrap support">
          <div className="section-head">
            <h2>Suporte com protocolo para cada chamado</h2>
            <p className="lead">Todo chamado ganha um protocolo. Você acompanha o andamento pela Área do cliente, recebe aviso a cada resposta e tem acesso a treinamentos em vídeo para a equipe.</p>
            <div className="hero-actions">
              <Link className="btn btn-ghost" to="/novo">Já sou cliente, abrir chamado</Link>
              <Link className="btn btn-ghost" to="/treinamentos">Treinamentos</Link>
            </div>
          </div>
          <div className="support-card" aria-label="Exemplo da Área do cliente">
            <div className="note" style={{ fontWeight: 700 }}>Área do cliente · Meus chamados <span className="ex">exemplo</span></div>
            <div className="tk"><span className="id mono">#HT-2041</span><b>Impressora fiscal não imprime</b><span className="tag t-and">Em atendimento</span><small>Automax · hoje 09:14 · com Rafael</small></div>
            <div className="tk"><span className="id mono">#HT-2039</span><b>Cadastrar novo garçom</b><span className="tag t-ok">Resolvido</span><small>Mettre · ontem · avaliado 5/5</small></div>
            <div className="tk"><span className="id mono">#HT-2038</span><b>Ajuste no cadastro de produtos</b><span className="tag t-ok">Resolvido</span><small>Automax · 06/11</small></div>
          </div>
        </div>
      </section>

      <section className="s-section alt" id="proposta">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">Sem pacote fechado</span>
            <h2>Você paga pelo que <em>o seu negócio usa</em></h2>
            <p className="lead">Não trabalhamos com plano de prateleira. Depois de entender a sua rotina, montamos uma proposta sob medida, com preço fechado e sem surpresa.</p>
          </div>
          <div><Proposta produto={p} /></div>
        </div>
      </section>

      <section className="s-section" id="faq">
        <div className="wrap">
          <div className="section-head center"><h2>Antes de agendar, você pode querer saber</h2></div>
          <div className="faq">
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="s-section alt" id="demo">
        <div className="wrap demo">
          <div className="demo-copy section-head">
            <h2>Veja o sistema funcionando com o seu tipo de negócio</h2>
            <p className="lead">Em 30 minutos, um consultor mostra na prática como fica o seu caixa, seu estoque e seus relatórios. Você sai sabendo quanto vai pagar e quando começa.</p>
            <div className="reassure" style={{ display: 'grid', gap: 8 }}><span>Sem compromisso e sem cartão</span><span>Retorno pelo WhatsApp em até 1 hora útil</span><span>Proposta com preço fechado</span></div>
          </div>
          <DemoForm escolha={escolha} onPick={setEscolha} />
        </div>
      </section>
    </div>
  );
}

export function Urgencia({ titulo, texto }) {
  return (
    <div className="urgency">
      <div className="timeline" aria-label="Calendário da Reforma Tributária">
        <span className="now"><b>2026</b>testes CBS e IBS</span>
        <span><b>2027</b>CBS em vigor</span>
        <span><b>2033</b>modelo completo</span>
      </div>
      <div><span className="when">REFORMA TRIBUTÁRIA</span><h3>{titulo}</h3><p>{texto}</p></div>
      <BotaoDemo>Quero ver na demo</BotaoDemo>
    </div>
  );
}

export { BotaoDemo };

export default function SiteHome() {
  return (
    <SiteLayout>
      <Conteudo />
    </SiteLayout>
  );
}
