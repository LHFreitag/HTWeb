import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CONTATO, waLink } from '../contato';
import { IconZap, Logo } from './Icons';
import { Lightbox, SiteContext, rolarAte, useLightbox } from './Shared';
import '../site.css';

/* Casca comum do site de apresentação.
   landing: 'automax' | 'mettre' deixa o cabeçalho mínimo (sem menu, só "← Voltar ao site" e o CTA). */
export default function SiteLayout({ landing, children }) {
  const { tela, abrirTela, fecharTela } = useLightbox();
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const demoId = landing ? `demo-${landing}` : 'demo';

  // Ao trocar de página: topo, ou a âncora pedida (ex.: /#demo).
  useEffect(() => {
    setMenuAberto(false);
    const alvo = hash.replace('#', '');
    if (!alvo) { window.scrollTo(0, 0); return undefined; }
    // as telas acima ainda carregam e empurram o conteúdo: ajusta de novo logo depois
    const t = [0, 350, 900].map((ms) => setTimeout(() => { if (!rolarAte(alvo, false) && ms === 0) window.scrollTo(0, 0); }, ms));
    return () => t.forEach(clearTimeout);
  }, [pathname, hash]);

  const irPara = useCallback((id) => {
    setMenuAberto(false);
    if (pathname === '/') rolarAte(id);
    else navigate(`/#${id}`);
  }, [pathname, navigate]);

  const irParaDemo = useCallback((e) => {
    e?.preventDefault?.();
    setMenuAberto(false);
    if (!rolarAte(demoId)) navigate('/#demo');
    setTimeout(() => {
      document.querySelector(`#${demoId} .form-card input:checked, #${demoId} .form-card button`)?.focus({ preventScroll: true });
    }, 450);
  }, [demoId, navigate]);

  const ctx = useMemo(() => ({ abrirTela, irParaDemo, irPara }), [abrirTela, irParaDemo, irPara]);

  const linkAncora = (id, texto) => (
    <a href={`/#${id}`} onClick={(e) => { e.preventDefault(); irPara(id); }}>{texto}</a>
  );

  return (
    <SiteContext.Provider value={ctx}>
      <div className={`ht-site${landing === 'mettre' ? ' is-mettre' : ''}`}>
        <header className={`header${landing ? ' min' : ''}`}>
          <div className="wrap">
            <Link className="brand" to="/" aria-label="House Tech Sistemas, início">
              <Logo />
              <span className="brand-name">House Tech<small>Sistemas</small></span>
            </Link>
            {!landing && (
              <nav className={`nav${menuAberto ? ' open' : ''}`} id="nav" aria-label="Principal">
                <Link to="/automax"><span className="dot" style={{ background: 'var(--blue)' }} />Automax · Varejo</Link>
                <Link to="/mettre"><span className="dot" style={{ background: 'var(--green)' }} />Mettre · Restaurantes</Link>
                {linkAncora('proposta', 'Preço')}
                {linkAncora('suporte', 'Suporte')}
              </nav>
            )}
            <div className="header-cta">
              {landing && <Link className="back-link" to="/">← Voltar ao site</Link>}
              {!landing && <Link className="btn btn-ghost btn-sm hide-sm" to="/cliente">Área do cliente</Link>}
              <a className="btn btn-gold btn-sm hide-xs" href={`#${demoId}`} onClick={irParaDemo}>Agendar demonstração</a>
              {!landing && (
                <button type="button" className="btn btn-ghost btn-sm menu-btn" aria-expanded={menuAberto} aria-controls="nav" aria-label="Abrir menu" onClick={() => setMenuAberto((v) => !v)}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </button>
              )}
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <div className="wrap">
            <div>
              <Link className="brand" to="/"><Logo size={34} /><span className="brand-name">House Tech<small>Sistemas</small></span></Link>
              <p>Sistemas de gestão para varejo e alimentação, com implantação e suporte da nossa equipe.</p>
              <p className="mono" style={{ fontSize: 13 }}><a href={`mailto:${CONTATO.email}`}>{CONTATO.email}</a></p>
            </div>
            <div>
              <h4>Produtos</h4>
              <ul>
                <li><Link to="/automax">Automax para varejo</Link></li>
                <li><Link to="/mettre">Mettre para restaurantes</Link></li>
                <li><a href={waLink('geral')} target="_blank" rel="noopener noreferrer">Falar com o comercial</a></li>
              </ul>
            </div>
            <div>
              <h4>Clientes</h4>
              <ul>
                <li><Link to="/cliente">Área do cliente</Link></li>
                <li><Link to="/novo">Abrir chamado</Link></li>
                <li><Link to="/treinamentos">Treinamentos</Link></li>
              </ul>
            </div>
            <div>
              <h4>Empresa</h4>
              <ul>
                <li>{linkAncora('como', 'Como funciona')}</li>
                <li><a href={`#${demoId}`} onClick={irParaDemo}>Fale com um consultor</a></li>
              </ul>
            </div>
          </div>
        </footer>

        <a className="zap" href={waLink('produtos')} target="_blank" rel="noopener noreferrer">
          <IconZap />Fale no WhatsApp
        </a>
        <div className="mbar">
          <a className="btn btn-zap" href={waLink('produtos')} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"><IconZap /></a>
          <a className="btn btn-gold" href={`#${demoId}`} onClick={irParaDemo}>Agendar demonstração grátis</a>
        </div>

        <Lightbox tela={tela} onClose={fecharTela} />
      </div>
    </SiteContext.Provider>
  );
}
