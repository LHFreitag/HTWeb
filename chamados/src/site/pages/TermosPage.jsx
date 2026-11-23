import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout';
import { EMPRESA, VERSAO_POLITICA } from '../../privacidade/empresa';
import Preencher from '../../privacidade/Preencher';

function dataBR(iso) {
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

export default function TermosPage() {
  useEffect(() => { document.title = 'Termos de Uso · House Tech Sistemas'; }, []);

  return (
    <SiteLayout>
      <article className="legal">
        <div className="wrap">
          <header className="legal-head">
            <span className="eyebrow">Termos</span>
            <h1>Termos de Uso do site</h1>
            <p className="lead">As regras para usar este site, a área do cliente e a abertura de chamados.</p>
            <p className="note">Versão de {dataBR(VERSAO_POLITICA)}.</p>
          </header>

          <section>
            <h2>1. Quem somos</h2>
            <p>
              Este site é mantido pela <strong><Preencher valor={EMPRESA.razaoSocial} rotulo="razão social" /></strong>
              {' '}({EMPRESA.nomeFantasia}), CNPJ <Preencher valor={EMPRESA.cnpj} rotulo="CNPJ" />, com sede em{' '}
              <Preencher valor={EMPRESA.endereco} rotulo="endereço completo" />. Contato:{' '}
              <a href={`mailto:${EMPRESA.emailComercial}`}>{EMPRESA.emailComercial}</a> ou WhatsApp {EMPRESA.whatsappExibicao}.
            </p>
          </section>

          <section>
            <h2>2. Uso do site</h2>
            <p>
              Ao usar o site você concorda com estes termos. O conteúdo serve para apresentar os sistemas Automax e Mettre e
              os serviços da House Tech. As telas, recursos e exemplos mostrados são ilustrativos e podem mudar sem aviso.
            </p>
            <p>
              <strong>Preço e proposta.</strong> Não publicamos preços fixos. O valor depende do número de computadores,
              unidades e necessidades de cada negócio, e só vale a proposta enviada por escrito pelo comercial.
            </p>
          </section>

          <section>
            <h2>3. Área do cliente, chamados e painel de suporte</h2>
            <ul>
              <li>Ao abrir um chamado, informe dados verdadeiros e não inclua senhas, dados de cartão ou dados de terceiros na descrição.</li>
              <li>Quem tem login é responsável por guardar a própria senha e não compartilhar o acesso.</li>
              <li>O painel de suporte é de uso exclusivo da equipe autorizada. Tentativas de acesso indevido podem ser bloqueadas e comunicadas às autoridades.</li>
            </ul>
          </section>

          <section>
            <h2>4. Condutas proibidas</h2>
            <p>
              Não é permitido usar o site para enviar conteúdo ilegal ou ofensivo, tentar acessar áreas ou dados sem
              autorização, sobrecarregar o serviço, coletar dados de outras pessoas ou copiar o conteúdo para fins comerciais.
            </p>
          </section>

          <section>
            <h2>5. Propriedade intelectual</h2>
            <p>
              Marcas, logotipos, textos, imagens e telas dos sistemas pertencem à House Tech ou aos seus licenciantes. O uso do
              site não concede nenhuma licença sobre eles. Os sistemas são licenciados por contrato próprio.
            </p>
          </section>

          <section>
            <h2>6. Links de terceiros</h2>
            <p>
              Alguns botões levam ao WhatsApp e a outros serviços. Esses serviços têm termos e políticas de privacidade
              próprios, que recomendamos ler.
            </p>
          </section>

          <section>
            <h2>7. Responsabilidade</h2>
            <p>
              Trabalhamos para manter o site disponível e as informações corretas, mas não garantimos funcionamento sem
              interrupções. Nada aqui limita direitos garantidos pelo Código de Defesa do Consumidor.
            </p>
          </section>

          <section>
            <h2>8. Privacidade</h2>
            <p>
              O tratamento de dados pessoais segue a <Link to="/privacidade">Política de Privacidade</Link>, que faz parte
              destes termos.
            </p>
          </section>

          <section>
            <h2>9. Lei e foro</h2>
            <p>
              Estes termos seguem a lei brasileira. Fica eleito o foro da comarca de Cuiabá - MT, salvo quando a lei garantir
              ao consumidor o foro do seu domicílio.
            </p>
          </section>
        </div>
      </article>
    </SiteLayout>
  );
}
