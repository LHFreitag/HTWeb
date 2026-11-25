import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUTOS } from '../data';
import { enviarLead, waURL } from '../contato';
import { IconZap } from './Icons';
import { TEXTO_CONSENTIMENTO_MARKETING, eventoConsentimento } from '../../privacidade/consentimentoMarketing';
import { registrarEvento } from '../../privacidade/consent';

/* Formulário de demonstração em 2 passos.
   fixo: 'automax' | 'mettre' nas landings (sem a pergunta do negócio); no hub, escolha + onPick. */
export default function DemoForm({ fixo, escolha, onPick }) {
  const id = useId();
  const [passo, setPasso] = useState(1);
  const [unidades, setUnidades] = useState('1');
  const [sistemaAtual, setSistemaAtual] = useState('Outro sistema e quero trocar');
  const [nome, setNome] = useState('');
  const [zap, setZap] = useState('');
  const [cidade, setCidade] = useState('');
  const [email, setEmail] = useState('');
  const [aceitaNovidades, setAceitaNovidades] = useState(false); // sempre começa desmarcada (LGPD, art. 8º)
  const [erro, setErro] = useState(null);
  const [ok, setOk] = useState(null);
  const nomeRef = useRef(null);
  const zapRef = useRef(null);

  const chave = fixo || escolha || 'automax';
  const produto = PRODUTOS[chave];

  const continuar = () => {
    setPasso(2);
    requestAnimationFrame(() => nomeRef.current?.focus());
  };

  const enviar = (e) => {
    e.preventDefault();
    const digitos = zap.replace(/\D/g, '');
    if (!nome.trim()) {
      setErro({ campo: 'nome', msg: 'Escreva seu nome para o consultor saber com quem falar.' });
      nomeRef.current?.focus();
      return;
    }
    if (digitos.length < 10) {
      setErro({ campo: 'zap', msg: 'Coloque o WhatsApp com DDD, 10 ou 11 dígitos.' });
      zapRef.current?.focus();
      return;
    }
    setErro(null);
    const resumo = [
      `Olá! Estou entrando em contato pelo site da House Tech e quero agendar uma demonstração do ${produto.nome}.`,
      `Nome: ${nome.trim()}`,
      `WhatsApp: ${zap}`,
      cidade.trim() && `Cidade: ${cidade.trim()}`,
      `Unidades: ${unidades}`,
      `Hoje uso: ${sistemaAtual}`,
    ].filter(Boolean).join('\n');

    // TODO(backend): ver enviarLead em contato.js (e-mail + WhatsApp automáticos só para o comercial).
    // Minimização: só vai o que o comercial precisa para marcar a demonstração.
    // O consentimento de marketing segue junto como evento separado, apenas se a caixa foi marcada.
    enviarLead({
      produto: produto.nome, nome: nome.trim(), whatsapp: zap, cidade: cidade.trim(), email: email.trim(), unidades, sistemaAtual, resumo,
      baseLegal: 'art. 7º, V (procedimentos preliminares a contrato, a pedido do titular)',
      consentimentos: aceitaNovidades
        ? [eventoConsentimento({ canal: 'formulario_demonstracao', pagina: window.location.pathname })]
        : [],
    }).catch(() => {});
    registrarEvento('pedido_demonstracao', { produto: produto.nome });

    setOk({ primeiroNome: nome.trim().split(' ')[0], zap, produto: produto.nome, href: waURL(resumo) });
    setPasso(3);
  };

  const reiniciar = () => {
    setNome(''); setZap(''); setCidade(''); setEmail(''); setAceitaNovidades(false); setUnidades('1');
    setSistemaAtual('Outro sistema e quero trocar'); setOk(null); setPasso(1);
  };

  return (
    <form className="form-card" noValidate onSubmit={enviar}>
      {passo < 3 && (
        <div className="progress" aria-hidden="true"><i className="on" /><i className={passo > 1 ? 'on' : ''} /></div>
      )}

      {passo === 1 && (
        <div style={{ display: 'grid', gap: 16 }}>
          <h3>Agende sua demonstração grátis</h3>
          {!fixo && (
            <div className="field">
              <span className="lbl" id={`${id}-negl`}>Seu negócio</span>
              <div className="opts" role="radiogroup" aria-labelledby={`${id}-negl`}>
                <input type="radio" name={`${id}-neg`} id={`${id}-n1`} value="automax" checked={chave === 'automax'} onChange={() => onPick?.('automax')} />
                <label htmlFor={`${id}-n1`}>Loja / varejo</label>
                <input type="radio" name={`${id}-neg`} id={`${id}-n2`} value="mettre" checked={chave === 'mettre'} onChange={() => onPick?.('mettre')} />
                <label htmlFor={`${id}-n2`}>Restaurante / lanchonete</label>
              </div>
            </div>
          )}
          <div className="field">
            <span className="lbl" id={`${id}-ul`}>Quantas unidades?</span>
            <div className="opts" role="radiogroup" aria-labelledby={`${id}-ul`}>
              {['1', '2 a 5', '6 ou mais'].map((v, i) => (
                <span key={v} style={{ display: 'contents' }}>
                  <input type="radio" name={`${id}-uni`} id={`${id}-u${i}`} value={v} checked={unidades === v} onChange={() => setUnidades(v)} />
                  <label htmlFor={`${id}-u${i}`}>{v}</label>
                </span>
              ))}
            </div>
          </div>
          <div className="field">
            <label htmlFor={`${id}-sis`}>Hoje você usa</label>
            <select className="input" id={`${id}-sis`} value={sistemaAtual} onChange={(e) => setSistemaAtual(e.target.value)}>
              <option>Outro sistema e quero trocar</option>
              <option>Planilha ou caderno</option>
              <option>Nada, estou abrindo o negócio</option>
            </select>
          </div>
          <button className="btn btn-gold btn-lg btn-block" type="button" onClick={continuar}>Continuar</button>
          <p className="privacy">Leva menos de 1 minuto.</p>
        </div>
      )}

      {passo === 2 && (
        <div style={{ display: 'grid', gap: 16 }}>
          <h3>Para quem o consultor deve ligar?</h3>
          <div className="field">
            <label htmlFor={`${id}-nome`}>Seu nome</label>
            <input ref={nomeRef} className={`input${erro?.campo === 'nome' ? ' err' : ''}`} id={`${id}-nome`} autoComplete="name" placeholder="Ex.: Carla Menezes" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor={`${id}-zap`}>WhatsApp</label>
              <input ref={zapRef} className={`input${erro?.campo === 'zap' ? ' err' : ''}`} id={`${id}-zap`} inputMode="tel" autoComplete="tel" placeholder="DDD + número" value={zap} onChange={(e) => setZap(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor={`${id}-cid`}>Cidade</label>
              <input className="input" id={`${id}-cid`} autoComplete="address-level2" placeholder="Ex.: Cuiabá" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor={`${id}-mail`}>E-mail <span className="note">(opcional)</span></label>
            <input className="input" id={`${id}-mail`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <label className="consent" htmlFor={`${id}-mkt`}>
            <input type="checkbox" id={`${id}-mkt`} checked={aceitaNovidades} onChange={(e) => setAceitaNovidades(e.target.checked)} />
            <span>{TEXTO_CONSENTIMENTO_MARKETING} <span className="note">(opcional)</span></span>
          </label>
          {erro && <span className="err-msg" role="alert">{erro.msg}</span>}
          <div className="form-foot">
            <button className="btn btn-ghost" type="button" onClick={() => setPasso(1)}>Voltar</button>
            <button className="btn btn-gold btn-lg" type="submit" style={{ flex: 1 }}>Quero minha demonstração</button>
          </div>
          <p className="privacy">
            Usamos seus dados só para falar com você sobre a demonstração e a proposta. Saiba como cuidamos deles na{' '}
            <Link to="/privacidade">Política de Privacidade</Link>.
          </p>
        </div>
      )}

      {passo === 3 && ok && (
        <div className="success" role="status">
          <span className="big">✓</span>
          <h3>Pedido recebido, {ok.primeiroNome}!</h3>
          <p className="lead" style={{ fontSize: 16 }}>
            Um consultor do {ok.produto} vai chamar você no WhatsApp {ok.zap} em até 1 hora útil para marcar o melhor horário.
          </p>
          <a className="btn btn-wa" href={ok.href} target="_blank" rel="noopener noreferrer">
            <IconZap size={18} />Adiantar a conversa no WhatsApp
          </a>
          <button className="btn btn-ghost btn-sm" type="button" onClick={reiniciar}>Enviar outro pedido</button>
        </div>
      )}
    </form>
  );
}
