/* Consentimento de cookies (LGPD, arts. 7º, I e 8º; Guia de Cookies da ANPD, 2022).

   Categorias:
   - necessarios:  sempre ativos (lembrar esta escolha, login da área do cliente). Não pedem consentimento.
   - estatistica:  Google Analytics 4, se VITE_GA_ID estiver definido.
   - marketing:    Pixel da Meta (Instagram/Facebook) e remarketing, se VITE_META_PIXEL_ID estiver definido,
                   e o código de monitoramento do RD Station Marketing (VITE_RD_STATION_LOADER; vazio desliga).

   Nada de estatística ou marketing é carregado antes de a pessoa aceitar. Recusar é tão fácil
   quanto aceitar (mesmo destaque no banner), e a escolha pode ser mudada a qualquer momento
   pelo link "Preferências de cookies" no rodapé. A escolha vale por 12 meses; depois o banner volta. */

const CHAVE = 'ht-consent';
const VERSAO = 1;
const VALIDADE_MS = 365 * 24 * 60 * 60 * 1000;

export const GA_ID = import.meta.env.VITE_GA_ID || '';
export const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';
// Código de monitoramento do RD Station Marketing da House Tech. O RD usa cookies para ligar as
// visitas ao contato do lead, então só carrega com consentimento de marketing (LGPD art. 7º, I).
const RD_PADRAO = 'https://d335luupugsy2.cloudfront.net/js/loader-scripts/49e4dd00-8cdb-4014-adc2-51f1a3d414e5-loader.js';
export const RD_LOADER = import.meta.env.VITE_RD_STATION_LOADER ?? RD_PADRAO;

/** Há alguma ferramenta opcional configurada? Sem nenhuma, o banner não precisa aparecer. */
export const TEM_OPCIONAIS = Boolean(GA_ID || PIXEL_ID || RD_LOADER);

const ouvintes = new Set();

export function lerConsentimento() {
  try {
    const bruto = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    if (!bruto || bruto.v !== VERSAO) return null;
    if (Date.now() - new Date(bruto.data).getTime() > VALIDADE_MS) return null;
    return bruto;
  } catch {
    return null;
  }
}

export function salvarConsentimento({ estatistica, marketing }) {
  const anterior = lerConsentimento();
  const registro = {
    v: VERSAO,
    data: new Date().toISOString(),
    necessarios: true,
    estatistica: Boolean(estatistica),
    marketing: Boolean(marketing),
  };
  try { localStorage.setItem(CHAVE, JSON.stringify(registro)); } catch { /* sem armazenamento: vale só nesta visita */ }
  aplicarConsentimento(registro, anterior);
  ouvintes.forEach((fn) => fn(registro));
  return registro;
}

export function aoMudarConsentimento(fn) {
  ouvintes.add(fn);
  return () => ouvintes.delete(fn);
}

/** Abre o painel de preferências (usado pelo link do rodapé). */
export function abrirPreferencias() {
  window.dispatchEvent(new CustomEvent('ht:abrir-preferencias-cookies'));
}

/* ── Carregamento condicional das ferramentas ─────────────────────────── */

let gaCarregado = false;
let pixelCarregado = false;
let rdCarregado = false;

function injetarScript(src) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function carregarGA() {
  if (!GA_ID || gaCarregado) return;
  gaCarregado = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted',
  });
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
  injetarScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`);
}

function carregarPixel() {
  if (!PIXEL_ID || pixelCarregado) return;
  pixelCarregado = true;
  /* eslint-disable */
  const f = window;
  if (!f.fbq) {
    const n = (f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
  }
  /* eslint-enable */
  window.fbq('consent', 'grant');
  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');
  injetarScript('https://connect.facebook.net/en_US/fbevents.js');
}

function carregarRD() {
  if (!RD_LOADER || rdCarregado) return;
  rdCarregado = true;
  injetarScript(RD_LOADER);
}

function apagarCookies(prefixos) {
  const dominio = window.location.hostname;
  const alvos = [dominio, `.${dominio}`, `.${dominio.split('.').slice(-2).join('.')}`];
  document.cookie.split(';').forEach((c) => {
    const nome = c.split('=')[0].trim();
    if (!prefixos.some((p) => nome.startsWith(p))) return;
    alvos.forEach((d) => { document.cookie = `${nome}=; Max-Age=0; path=/; domain=${d}`; });
    document.cookie = `${nome}=; Max-Age=0; path=/`;
  });
}

function aplicarConsentimento(atual, anterior) {
  if (!atual) return;
  if (atual.estatistica) carregarGA();
  if (atual.marketing) { carregarPixel(); carregarRD(); }

  // Retirada do consentimento (LGPD, art. 8º, §5º): para de coletar e apaga o que ficou no navegador.
  if (anterior?.estatistica && !atual.estatistica) {
    if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
    if (GA_ID) window[`ga-disable-${GA_ID}`] = true;
    apagarCookies(['_ga', '_gid', '_gat']);
  }
  if (anterior?.marketing && !atual.marketing) {
    if (window.fbq) window.fbq('consent', 'revoke');
    apagarCookies(['_fbp', '_fbc', '__trf', 'rdtrk', '_rdtrk']);
    // O script do RD não tem "desligar": recarrega a página para ele parar de rodar.
    if (rdCarregado) { window.location.reload(); return; }
  }
}

/** Chamar uma vez ao abrir o site: reaplica a escolha guardada. */
export function iniciarConsentimento() {
  aplicarConsentimento(lerConsentimento(), null);
}

/** Registra uma conversão (ex.: pedido de demonstração, clique no WhatsApp).
    Só envia para as ferramentas que a pessoa autorizou. */
export function registrarEvento(nome, params = {}) {
  const c = lerConsentimento();
  if (c?.estatistica && window.gtag) window.gtag('event', nome, params);
  if (c?.marketing && window.fbq) window.fbq('trackCustom', nome, params);
}
