import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import { waURL } from '../contato';
import { EMPRESA, ENCARREGADO, PRAZO_LEADS_MESES, VERSAO_POLITICA } from '../../privacidade/empresa';
import { abrirPreferencias, GA_ID, PIXEL_ID, RD_LOADER } from '../../privacidade/consent';
import Preencher from '../../privacidade/Preencher';

export const ASSUNTO_TITULAR = 'LGPD - Solicitação do titular de dados';
const CORPO_TITULAR = [
  'Olá, House Tech.',
  '',
  'Quero exercer meu direito como titular de dados pessoais (LGPD, art. 18).',
  '',
  'Meu nome:',
  'E-mail ou WhatsApp que usei com vocês:',
  'O que eu peço (ex.: saber quais dados vocês têm, corrigir, excluir, deixar de receber mensagens):',
  '',
].join('\n');

export const mailtoTitular = `mailto:${ENCARREGADO.email}?subject=${encodeURIComponent(ASSUNTO_TITULAR)}&body=${encodeURIComponent(CORPO_TITULAR)}`;

function dataBR(iso) {
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

const TRATAMENTOS = [
  {
    quando: 'Pedido de demonstração (formulário do site)',
    dados: 'Nome, WhatsApp, cidade, e-mail (opcional), tipo de negócio, número de unidades e sistema que usa hoje.',
    para: 'Entrar em contato para marcar e fazer a demonstração e preparar uma proposta.',
    base: 'Procedimentos preliminares a um contrato, a pedido do titular (art. 7º, V).',
    prazo: `Até ${PRAZO_LEADS_MESES} meses sem negócio fechado. Se virar cliente, enquanto durar o contrato.`,
  },
  {
    quando: 'Novidades e ofertas (caixa opcional no formulário)',
    dados: 'Nome, WhatsApp e e-mail.',
    para: 'Enviar novidades, conteúdos e ofertas da House Tech.',
    base: 'Consentimento (art. 7º, I), que pode ser retirado a qualquer momento.',
    prazo: 'Até você retirar o consentimento.',
  },
  {
    quando: 'Conversa pelo WhatsApp ou e-mail',
    dados: 'Nome, número ou e-mail e o conteúdo da conversa.',
    para: 'Responder dúvidas, negociar e atender clientes.',
    base: 'Procedimentos preliminares e execução de contrato (art. 7º, V) e legítimo interesse (art. 7º, IX).',
    prazo: 'Enquanto durar o atendimento ou o contrato e o prazo legal depois dele.',
  },
  {
    quando: 'Chamados de suporte (área do cliente)',
    dados: 'E-mail, telefone (opcional) e a descrição do problema.',
    para: 'Atender e acompanhar o chamado.',
    base: 'Execução de contrato (art. 7º, V).',
    prazo: 'Enquanto durar o contrato de suporte e até 5 anos depois, para defesa em eventual processo (art. 7º, VI).',
  },
  {
    quando: 'Cadastro de membros da equipe de suporte',
    dados: 'Nome, e-mail, telefone, nível de experiência e dados de login.',
    para: 'Liberar e controlar o acesso ao painel de chamados.',
    base: 'Execução de contrato (art. 7º, V) e legítimo interesse na segurança do sistema (art. 7º, IX).',
    prazo: 'Enquanto a pessoa fizer parte da equipe.',
  },
  {
    quando: 'Navegação no site',
    dados: 'Endereço IP, tipo de navegador e páginas visitadas, registrados pelo servidor e, com sua permissão, por ferramentas de estatística e marketing (ver Cookies).',
    para: 'Manter o site funcionando com segurança e, se você permitir, medir visitas e mostrar anúncios.',
    base: 'Obrigação legal (art. 7º, II, Marco Civil art. 15) para registros de acesso; consentimento (art. 7º, I) para cookies opcionais.',
    prazo: 'Registros de acesso: 6 meses (Marco Civil da Internet, art. 15). Cookies: veja a tabela abaixo.',
  },
];

export default function PrivacidadePage() {
  useEffect(() => { document.title = 'Política de Privacidade · House Tech Sistemas'; }, []);

  return (
    <SiteLayout>
      <article className="legal">
        <div className="wrap">
          <header className="legal-head">
            <span className="eyebrow">LGPD · Lei 13.709/2018</span>
            <h1>Política de Privacidade</h1>
            <p className="lead">
              Como a House Tech Sistemas coleta, usa e protege os seus dados pessoais, e como você pode pedir
              para ver, corrigir ou apagar esses dados.
            </p>
            <p className="note">Versão de {dataBR(VERSAO_POLITICA)}.</p>
          </header>

          <nav className="legal-toc" aria-label="Nesta página">
            <a href="#controlador">Quem somos</a>
            <a href="#dados">Dados e finalidades</a>
            <a href="#compartilhamento">Compartilhamento</a>
            <a href="#seguranca">Segurança</a>
            <a href="#direitos">Seus direitos</a>
            <a href="#cookies">Cookies</a>
          </nav>

          <section id="controlador">
            <h2>1. Quem é responsável pelos seus dados</h2>
            <p>
              O controlador dos dados pessoais tratados neste site é a <strong><Preencher valor={EMPRESA.razaoSocial} rotulo="razão social" /></strong>,
              nome fantasia {EMPRESA.nomeFantasia}, inscrita no CNPJ sob o nº <Preencher valor={EMPRESA.cnpj} rotulo="CNPJ" />,
              com sede em <Preencher valor={EMPRESA.endereco} rotulo="endereço completo" />.
            </p>
            {ENCARREGADO.nome ? (
              <p>
                <strong>Encarregado pelo tratamento de dados (DPO):</strong> {ENCARREGADO.nome}.
                Contato: <a href={mailtoTitular}>{ENCARREGADO.email}</a>.
              </p>
            ) : (
              <p>
                <strong>Canal de privacidade:</strong> como agente de tratamento de pequeno porte, a House Tech usa a dispensa de
                indicar encarregado (Resolução CD/ANPD nº 2/2022, art. 11) e mantém este canal para assuntos de privacidade e
                pedidos de titulares: <a href={mailtoTitular}>{ENCARREGADO.email}</a> ou WhatsApp {EMPRESA.whatsappExibicao}.
              </p>
            )}
          </section>

          <section id="dados">
            <h2>2. Quais dados coletamos e para quê</h2>
            <p>Coletamos só o necessário para cada finalidade. Não pedimos CPF, documentos ou dados sensíveis pelo site.</p>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr><th>Situação</th><th>Dados</th><th>Para quê</th><th>Base legal (LGPD)</th><th>Por quanto tempo</th></tr>
                </thead>
                <tbody>
                  {TRATAMENTOS.map((t) => (
                    <tr key={t.quando}>
                      <th scope="row">{t.quando}</th><td>{t.dados}</td><td>{t.para}</td><td>{t.base}</td><td>{t.prazo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Ao fim de cada prazo, os dados são apagados ou anonimizados, salvo quando a lei exigir que sejam guardados
              (por exemplo, documentos fiscais de clientes).
            </p>
          </section>

          <section id="compartilhamento">
            <h2>3. Com quem compartilhamos</h2>
            <p>Não vendemos nem alugamos dados pessoais. Compartilhamos apenas com quem nos ajuda a prestar o serviço:</p>
            <ul>
              <li><strong>Google (Firebase), como operador:</strong> hospedagem do site, banco de dados, login e armazenamento de arquivos, seguindo nossas instruções.</li>
              <li><strong>Meta (WhatsApp), como controlador independente:</strong> quando você fala com a gente pelo WhatsApp, a conversa passa pelos servidores da Meta, que segue a política de privacidade dela.</li>
              {GA_ID && <li><strong>Google Analytics, como operador:</strong> só se você aceitar os cookies de estatística.</li>}
              {RD_LOADER && <li><strong>RD Station Marketing (Resultados Digitais), como operador:</strong> só se você aceitar os cookies de marketing. Registra as páginas visitadas e, se você já tiver falado com a gente, liga essas visitas ao seu contato para o comercial entender seu interesse.</li>}
              {PIXEL_ID && <li><strong>Meta (Pixel do Facebook/Instagram), com quem compartilhamos o controle desses dados:</strong> só se você aceitar os cookies de marketing.</li>}
              <li><strong>Autoridades públicas:</strong> quando houver obrigação legal ou ordem judicial.</li>
            </ul>
            <p>
              <strong>Transferência internacional (art. 33).</strong> Google, Meta e o RD Station podem guardar e processar dados em servidores
              fora do Brasil, principalmente nos Estados Unidos, para as finalidades acima. Como os Estados Unidos não têm decisão
              de adequação da ANPD, essas transferências se apoiam nas cláusulas contratuais de proteção de dados oferecidas por
              esses fornecedores (art. 33, II) e, no caso do WhatsApp, no fato de a conversa ser necessária para atender o seu
              pedido (art. 33, IX).
            </p>
          </section>

          <section id="seguranca">
            <h2>4. Como protegemos os dados</h2>
            <ul>
              <li>Conexão sempre criptografada (HTTPS).</li>
              <li>Acesso aos pedidos de demonstração e aos chamados só para a equipe autorizada, com login individual.</li>
              <li>Regras de acesso no banco de dados que impedem que visitantes leiam ou alterem dados de outras pessoas.</li>
              <li>Fontes do site servidas pelo próprio site, sem enviar o seu IP a terceiros só para carregar a página.</li>
            </ul>
            <p>
              Se acontecer um incidente de segurança que possa trazer risco ou dano relevante a você, avisaremos você e a ANPD
              (art. 48).
            </p>
          </section>

          <section id="direitos">
            <h2>5. Seus direitos e como exercê-los</h2>
            <p>A qualquer momento, sem custo, você pode pedir (art. 18):</p>
            <ul className="legal-cols">
              <li>confirmação de que tratamos seus dados;</li>
              <li>acesso aos seus dados;</li>
              <li>correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>portabilidade dos dados a outro fornecedor;</li>
              <li>eliminação dos dados tratados com o seu consentimento;</li>
              <li>informação sobre com quem compartilhamos seus dados;</li>
              <li>informação sobre a possibilidade de não consentir e suas consequências;</li>
              <li>retirada do consentimento;</li>
              <li>revisão de decisões tomadas só com base em tratamento automatizado.</li>
            </ul>
            <div className="legal-cta">
              <a className="btn btn-gold" href={mailtoTitular}>Fazer um pedido por e-mail</a>
              <a className="btn btn-ghost" href={waURL(`${ASSUNTO_TITULAR}. Quero fazer um pedido sobre meus dados pessoais.`)} target="_blank" rel="noopener noreferrer">
                Pedir pelo WhatsApp
              </a>
            </div>
            <p>
              Para proteger seus dados, confirmamos que o pedido é seu pelo mesmo e-mail ou WhatsApp que você já usou com a gente.
              Não pedimos documentos nem selfie para isso. Pedidos feitos por representante legal ou procurador precisam de
              comprovação dessa condição (art. 18, § 3º).
            </p>
            <p>
              <strong>Prazos.</strong> A confirmação de que temos dados seus e o acesso em formato simplificado são respondidos em
              até 15 dias, e a declaração completa (origem, critérios e finalidades) também em até 15 dias, contados do pedido
              (art. 19 e Resolução CD/ANPD nº 2/2022, art. 14). A retirada de consentimento vale na hora para novos envios.
              Quando corrigirmos ou apagarmos dados, avisamos as empresas com quem eles foram compartilhados para que façam o
              mesmo (art. 18, § 6º).
            </p>
            <p>
              Pedidos podem ser feitos por qualquer canal da House Tech, inclusive o WhatsApp do comercial ou do suporte, sem
              precisar usar termos técnicos. Se não ficar satisfeito, você também pode reclamar à{' '}
              <a href="https://www.gov.br/anpd/pt-br" target="_blank" rel="noopener noreferrer">Autoridade Nacional de Proteção de Dados (ANPD)</a>.
            </p>
            <p>
              Para deixar de receber novidades, basta responder “sair” à mensagem ou e-mail que você recebeu.
            </p>
          </section>

          <section id="cookies">
            <h2>6. Cookies</h2>
            <p>
              Cookies são pequenos arquivos que o site guarda no seu navegador. Os necessários ficam sempre ativos; os de
              estatística e marketing só são usados se você permitir, e você pode mudar a escolha quando quiser.
            </p>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead><tr><th>Tipo</th><th>Para quê</th><th>Quem coloca</th><th>Duração</th></tr></thead>
                <tbody>
                  <tr><th scope="row">Necessários</th><td>Lembrar sua escolha de cookies e o tipo de negócio escolhido; manter o login da área do cliente e do suporte.</td><td>House Tech e Google (Firebase Auth)</td><td>Até 12 meses</td></tr>
                  <tr><th scope="row">Estatística</th><td>Contar visitas, páginas vistas e cliques de forma agregada.</td><td>{GA_ID ? 'Google Analytics (_ga, _gid)' : 'Nenhuma ferramenta ativa no momento'}</td><td>Até 13 meses</td></tr>
                  <tr><th scope="row">Marketing</th><td>Registrar as páginas visitadas para o comercial (RD Station), mostrar anúncios da House Tech a quem já visitou o site e medir os resultados.</td><td>{[RD_LOADER && 'RD Station (__trf.src, rdtrk)', PIXEL_ID && 'Meta Pixel (_fbp, _fbc)'].filter(Boolean).join('; ') || 'Nenhuma ferramenta ativa no momento'}</td><td>Até 12 meses</td></tr>
                </tbody>
              </table>
            </div>
            <div className="legal-cta">
              <button type="button" className="btn btn-ghost" onClick={abrirPreferencias}>Mudar minhas preferências de cookies</button>
            </div>
          </section>

          <section id="outros">
            <h2>7. Crianças e adolescentes</h2>
            <p>O site é voltado a empresas e não se destina a menores de 18 anos. Não coletamos dados de crianças de forma intencional.</p>
            <h2>8. Mudanças nesta política</h2>
            <p>
              Podemos atualizar esta política. A data da versão fica no topo da página e, se a mudança for relevante, avisaremos
              no site. Veja também os <Link to="/termos">Termos de Uso</Link>.
            </p>
          </section>
        </div>
      </article>
    </SiteLayout>
  );
}
