import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GA_ID, PIXEL_ID, RD_LOADER, TEM_OPCIONAIS, lerConsentimento, salvarConsentimento } from './consent';
import './cookie-banner.css';

/* Banner e painel de preferências de cookies. Montado uma vez no App, vale para todas as páginas.
   Em desenvolvimento ele aparece mesmo sem GA/Pixel configurados, para dar para revisar. */
const MOSTRAR = TEM_OPCIONAIS || import.meta.env.DEV;

export default function CookieBanner() {
  const [visivel, setVisivel] = useState(() => MOSTRAR && !lerConsentimento());
  const [detalhes, setDetalhes] = useState(false);
  const [estatistica, setEstatistica] = useState(() => lerConsentimento()?.estatistica ?? false);
  const [marketing, setMarketing] = useState(() => lerConsentimento()?.marketing ?? false);
  const tituloRef = useRef(null);

  useEffect(() => {
    const abrir = () => {
      const c = lerConsentimento();
      setEstatistica(c?.estatistica ?? false);
      setMarketing(c?.marketing ?? false);
      setDetalhes(true);
      setVisivel(true);
      requestAnimationFrame(() => tituloRef.current?.focus());
    };
    window.addEventListener('ht:abrir-preferencias-cookies', abrir);
    return () => window.removeEventListener('ht:abrir-preferencias-cookies', abrir);
  }, []);

  if (!visivel) return null;

  const decidir = (escolha) => {
    salvarConsentimento(escolha);
    setVisivel(false);
    setDetalhes(false);
  };

  return (
    <section className="ht-cookies" role="dialog" aria-modal="false" aria-labelledby="ht-cookies-titulo">
      <h2 id="ht-cookies-titulo" tabIndex={-1} ref={tituloRef}>Sua privacidade</h2>
      <p>
        Usamos cookies necessários para o site funcionar. Com a sua permissão, usamos também cookies de
        estatística, para saber quais páginas ajudam mais, e de marketing, para nosso time comercial acompanhar
        as visitas e mostrar anúncios da House Tech a quem já visitou o site. Você escolhe e pode mudar quando quiser.{' '}
        <Link to="/privacidade#cookies">Política de Privacidade</Link>.
      </p>

      {detalhes && (
        <div className="ht-cookies-opcoes">
          <label className="ht-cookies-opcao">
            <input type="checkbox" checked disabled />
            <span><strong>Necessários</strong> (sempre ativos). Guardam esta escolha e mantêm o login da área do cliente.</span>
          </label>
          <label className="ht-cookies-opcao">
            <input type="checkbox" checked={estatistica} onChange={(e) => setEstatistica(e.target.checked)} />
            <span>
              <strong>Estatística.</strong> Contam visitas e cliques de forma agregada
              {GA_ID ? ' (Google Analytics)' : ''}.
            </span>
          </label>
          <label className="ht-cookies-opcao">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            <span>
              <strong>Marketing.</strong> Permitem que nossa equipe comercial saiba quais páginas você visitou
              {RD_LOADER ? ' (RD Station)' : ''} e mostrar anúncios da House Tech no Instagram, Facebook e Google
              {PIXEL_ID ? ' (Pixel da Meta)' : ''}.
            </span>
          </label>
        </div>
      )}

      <div className="ht-cookies-botoes">
        <button type="button" onClick={() => decidir({ estatistica: false, marketing: false })}>Recusar opcionais</button>
        {detalhes ? (
          <button type="button" onClick={() => decidir({ estatistica, marketing })}>Salvar minhas escolhas</button>
        ) : (
          <button type="button" onClick={() => setDetalhes(true)}>Personalizar</button>
        )}
        <button type="button" onClick={() => decidir({ estatistica: true, marketing: true })}>Aceitar todos</button>
      </div>
    </section>
  );
}
