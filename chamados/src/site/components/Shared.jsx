import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

/* Contexto do site: abrir a tela ampliada e ir até o formulário de demonstração da página atual. */
export const SiteContext = createContext({ abrirTela: () => {}, irParaDemo: () => {}, irPara: () => {} });
export const useSite = () => useContext(SiteContext);

/* Os títulos do conteúdo trazem um trecho em <em> para o destaque dourado. */
export function Em({ text }) {
  const partes = String(text).split(/<em>(.*?)<\/em>/);
  return partes.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p));
}

export function rolarAte(id, suave = true) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduzir = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: suave && !reduzir ? 'smooth' : 'auto', block: 'start' });
  return true;
}

export function telaSrc(file, dir) {
  return `/assets/${dir || 'automax'}/${file}.jpg`;
}

/* Tela real do sistema; um clique amplia. */
export function Shot({ file, alt, dir, eager = false }) {
  const { abrirTela } = useSite();
  const src = telaSrc(file, dir);
  return (
    <button type="button" className="shot" aria-label={`Ampliar: ${alt}`} onClick={(e) => abrirTela(src, alt, e.currentTarget)}>
      <img src={src} alt={alt} width="2400" height="1500" loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </button>
  );
}

export function Lightbox({ tela, onClose }) {
  const fechar = useRef(null);
  useEffect(() => {
    if (!tela) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    fechar.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [tela, onClose]);
  if (!tela) return null;
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={tela.alt} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <img src={tela.src} alt={tela.alt} />
      <button type="button" aria-label="Fechar" ref={fechar} onClick={onClose}>✕</button>
      <p>{tela.alt} · tela real, dados fictícios</p>
    </div>
  );
}

export function useLightbox() {
  const [tela, setTela] = useState(null);
  const origem = useRef(null);
  const abrirTela = useCallback((src, alt, el) => { origem.current = el; setTela({ src, alt }); }, []);
  const fecharTela = useCallback(() => { setTela(null); origem.current?.focus(); }, []);
  return { tela, abrirTela, fecharTela };
}

/* Faixa de segmentos que corre de lado (pausa no hover, no botão e fora da tela; parada com movimento reduzido). */
export function Marquee({ itens, speed = 34 }) {
  const raiz = useRef(null);
  const trilho = useRef(null);
  const [pausado, setPausado] = useState(false);
  const [ativo, setAtivo] = useState(false);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const reduzir = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduzir || typeof IntersectionObserver === 'undefined') return undefined;
    setAtivo(true);
    const el = raiz.current;
    const fit = () => {
      const w = trilho.current?.scrollWidth || 1000;
      el.style.setProperty('--mo-w', `${w}px`);
      el.style.setProperty('--mo-dur', `${(w / speed).toFixed(2)}s`);
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
    ro?.observe(trilho.current);
    const io = new IntersectionObserver((es) => setVisivel(es[es.length - 1].isIntersecting));
    io.observe(el);
    return () => { ro?.disconnect(); io.disconnect(); };
  }, [speed]);

  const lista = (props) => (
    <ul className="mo-mq__track" {...props}>
      {itens.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );

  return (
    <div ref={raiz} className={`mo-mq${ativo ? ' is-live' : ''}${visivel ? ' is-on' : ''}${pausado ? ' is-paused' : ''}`}>
      <div className="mo-mq__rail">
        {lista({ ref: trilho })}
        {ativo && lista({ 'aria-hidden': 'true', className: 'mo-mq__track mo-mq__clone' })}
      </div>
      {ativo && (
        <button type="button" className="loop-pause mo-mq__pause" aria-label={pausado ? 'Continuar' : 'Pausar'} onClick={() => setPausado((p) => !p)}>
          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" fill="currentColor">
            {pausado ? <path d="M4 2l8 5-8 5z" /> : <path d="M3 2h3v10H3zM8 2h3v10H8z" />}
          </svg>
        </button>
      )}
    </div>
  );
}

/* Título grande que ondula sob o ponteiro (filtro SVG só enquanto a onda existe). Toque e movimento reduzido: texto parado. */
let uid = 0;
export function LiquidType({ as: Tag = 'h2', className = '', children }) {
  const ref = useRef(null);
  useEffect(() => {
    const type = ref.current;
    const host = type?.parentElement;
    if (!type || !host) return undefined;
    const mq = (q) => window.matchMedia?.(q).matches;
    if (mq('(prefers-reduced-motion: reduce)') || mq('(pointer: coarse)') || typeof SVGFEDisplacementMapElement === 'undefined') return undefined;
    const ns = 'http://www.w3.org/2000/svg';
    const id = `ht-lt-${++uid}`;
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;pointer-events:none';
    svg.innerHTML = `<filter id="${id}" x="-5%" y="-20%" width="110%" height="140%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.006 0.013" numOctaves="1" seed="7"/><feDisplacementMap in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>`;
    document.body.append(svg);
    const turb = svg.querySelector('feTurbulence');
    const disp = svg.querySelector('feDisplacementMap');
    let energy = 0, raf = 0, on = false, lastX = 0, lastY = 0, hasLast = false, t0 = 0, px = 0.5;
    const clamp = (v) => Math.min(1, Math.max(0, v));
    const apply = () => {
      const sc = Math.min(44, energy);
      if (sc < 0.6) { if (on) { type.style.filter = ''; on = false; } return false; }
      disp.setAttribute('scale', sc.toFixed(1));
      const dx = 0.006 + (px - 0.5) * 0.002, dy = 0.013 + Math.sin(t0 / 700) * 0.003;
      turb.setAttribute('baseFrequency', `${dx.toFixed(4)} ${dy.toFixed(4)}`);
      if (!on) { type.style.filter = `url(#${id})`; on = true; }
      return true;
    };
    const tick = (now) => { raf = 0; t0 = now; energy *= 0.93; if (apply()) raf = requestAnimationFrame(tick); else energy = 0; };
    const move = (e) => {
      const r = type.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (!(x > -r.width * 0.04 && x < r.width * 1.04 && y > -r.height * 0.2 && y < r.height * 1.2)) { hasLast = false; return; }
      px = clamp(x / r.width);
      if (hasLast) energy = Math.min(44, energy + Math.min(9, Math.hypot(e.clientX - lastX, e.clientY - lastY) * 0.3) * 0.8);
      lastX = e.clientX; lastY = e.clientY; hasLast = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => { hasLast = false; };
    host.addEventListener('pointermove', move, { passive: true });
    host.addEventListener('pointerleave', leave);
    return () => {
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
      if (raf) cancelAnimationFrame(raf);
      type.style.filter = '';
      svg.remove();
    };
  }, []);
  return <Tag ref={ref} className={`mo-lt__type ${className}`}>{children}</Tag>;
}
