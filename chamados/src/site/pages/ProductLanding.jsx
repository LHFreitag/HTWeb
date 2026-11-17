import SiteLayout from '../components/SiteLayout';
import DemoForm from '../components/DemoForm';
import Proposta from '../components/Proposta';
import { Em, Shot } from '../components/Shared';
import { ProductIcon, StrokeIcon } from '../components/Icons';
import { BotaoDemo, Urgencia } from './SiteHome';
import { PRODUTOS } from '../data';

const ICONES_RECURSOS = [
  <path d="M3 12h4l3-8 4 16 3-8h4" />,
  <path d="M4 7l8-4 8 4v10l-8 4-8-4z M4 7l8 4 8-4 M12 11v10" />,
  <path d="M4 19V5 M4 19h16 M8 15l4-4 3 3 5-6" />,
  <path d="M6 3h9l4 4v14H6z M14 3v5h5 M9 13h7 M9 17h5" />,
  <path d="M3 21V9l9-6 9 6v12 M9 21v-6h6v6" />,
  <path d="M7 3h10v18H7z M11 18h2" />,
];

function Tour({ p }) {
  const lugar = p.lugar || 'sua loja';
  const urg = p.urgency || [
    'A transição dura anos, mas começa agora.',
    'Quem chega em 2027 com o sistema preparado continua vendendo. Na demonstração, mostramos como a sua nota fica com CBS e IBS.',
  ];
  return (
    <>
      <section className="s-section" id={`telas-${p.key}`}>
        <div className="wrap" style={{ gap: 72 }}>
          <div className="section-head center">
            <span className="real-tag">Telas reais do {p.nome}</span>
            <h2>{p.tourHead || 'Não é maquete. É o sistema que a sua loja vai usar.'}</h2>
            <p className="lead">
              Cada tela abaixo foi capturada do {p.nome} funcionando, com dados de demonstração. Na demo, você vê tudo isso com os produtos e a rotina {lugar.startsWith('seu') ? 'do' : 'da'} {lugar}.
            </p>
          </div>
          <div className="tour">
            {p.tour.map(([file, eyebrow, titulo, texto, dor, itens, resultado], i) => (
              <div className={`trow${i % 2 ? ' flip' : ''}`} key={file}>
                <Shot file={file} alt={titulo} dir={p.dir} />
                <div className="tcopy">
                  <span className="eyebrow p">{eyebrow}</span>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                  <div className="pain">{dor}</div>
                  <ul className="checks">{itens.map((b) => <li key={b}>{b}</li>)}</ul>
                  <span className="out">→ {resultado}</span>
                  {(i === 0 || i === 3) && <BotaoDemo className="btn btn-gold mini">{p.ctaMini || 'Ver isso na minha loja'}</BotaoDemo>}
                </div>
              </div>
            ))}
          </div>
          <Urgencia titulo={urg[0]} texto={urg[1]} />
          {p.gallery?.length > 0 && (
            <>
              <div className="section-head"><h2 style={{ fontSize: 'clamp(24px,3vw,34px)' }}>E tem muito mais por trás de cada tela</h2></div>
              <div className="gallery">
                {p.gallery.map(([file, titulo, texto]) => (
                  <figure key={file}>
                    <Shot file={file} alt={titulo} dir={p.dir} />
                    <figcaption><b>{titulo}</b>{texto}</figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div>
            <h2>Quer ver o {p.nome} com {p.bandTail || 'os produtos da sua loja'}?</h2>
            <p>Em 30 minutos um consultor monta o exemplo com o seu negócio. Sem compromisso e com preço fechado no fim.</p>
          </div>
          <BotaoDemo className="btn btn-gold btn-lg">Agendar minha demonstração grátis</BotaoDemo>
        </div>
      </section>
    </>
  );
}

export default function ProductLanding({ produto }) {
  const p = PRODUTOS[produto];
  return (
    <SiteLayout landing={p.key}>
      <section className="s-hero phero ht-enter">
        <div className="wrap">
          <div className="hero-copy">
            <div className="pname-lg"><span className="pmark"><ProductIcon produto={p} /></span><b>{p.nome}</b></div>
            <h1><Em text={p.lpTitle} /></h1>
            <p className="lead">{p.lpLead}</p>
            <div className="reassure">{(p.lpFact || p.heroFact).map((f) => <span key={f}>{f}</span>)}</div>
            <div className="ht-enter-media">
              <Shot file={p.heroImg[0]} alt={p.heroImg[1]} dir={p.dir} eager />
              <p className="note" style={{ marginTop: 10 }}><span className="real-tag">Tela real do sistema</span> · dados fictícios de demonstração</p>
            </div>
          </div>
          <DemoForm fixo={p.key} />
        </div>
      </section>

      {p.tour && <Tour p={p} />}

      <section className="s-section alt">
        <div className="wrap">
          <div className="section-head"><h2>Recursos do {p.nome} para o dia a dia</h2></div>
          <div className="feats">
            {p.feats.map(([titulo, texto, resultado], i) => (
              <div className="feat" key={titulo}>
                <span className="fi"><StrokeIcon>{ICONES_RECURSOS[i]}</StrokeIcon></span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
                <span className="out">→ {resultado}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s-section">
        <div className="wrap">
          <div className="section-head center">
            <h2>Segmentos e integrações do {p.nome}</h2>
            <p className="lead">Funciona do jeito que o seu negócio já trabalha e conversa com o que você já usa.</p>
          </div>
          <div className="segs">
            {p.segs.map((s) => <div key={s}><ProductIcon produto={p} size={26} />{s}</div>)}
          </div>
          <div className="integr">{p.integr.map((s) => <span key={s}>{s}</span>)}</div>
        </div>
      </section>

      <section className="s-section alt">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">Sem pacote fechado</span>
            <h2>Quanto custa o {p.nome}? <em>O que o seu negócio usa.</em></h2>
            <p className="lead">
              Cada {p.key === 'mettre' ? 'restaurante' : 'loja'} tem uma rotina. Por isso não vendemos plano de prateleira: entendemos o seu negócio e mandamos uma proposta sob medida, com preço fechado.
            </p>
          </div>
          <div><Proposta produto={p} /></div>
        </div>
      </section>

      <section className="s-section" id={`demo-${p.key}`}>
        <div className="wrap demo">
          <div className="section-head">
            <h2>Demonstração do {p.nome} em 30 minutos</h2>
            <p className="lead">Você vê o sistema com o seu tipo de negócio, recebe a proposta com preço fechado e decide sem pressão.</p>
            <div className="faq" style={{ margin: 0 }}>
              {p.faq.map(([q, a], i) => (
                <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
          </div>
          <DemoForm fixo={p.key} />
        </div>
      </section>
    </SiteLayout>
  );
}
