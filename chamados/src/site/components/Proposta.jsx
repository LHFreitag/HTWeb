import { waLink } from '../contato';
import { IconZap, StrokeIcon } from './Icons';

/* Proposta sob medida: o preço depende de cada cliente, então não há planos nem valores no site. */
export default function Proposta({ produto }) {
  const nome = produto ? produto.nome : 'sistema';
  const cards = [
    [<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>, 'Computadores e caixas', `Quantas máquinas vão usar o ${nome} e quantos caixas abrem ao mesmo tempo.`],
    [<path d="M3 21V9l9-6 9 6v12 M9 21v-6h6v6" />, 'Estabelecimentos', 'Uma loja, um restaurante ou uma rede com várias unidades e estoque entre elas.'],
    [<><path d="M4 7h16M4 12h10M4 17h7" /><path d="m15 17 2 2 4-4" /></>, 'O que você precisa', 'Os recursos, as integrações e o atendimento que fazem sentido para a sua rotina.'],
  ];
  return (
    <>
      <div className="prop">
        {cards.map(([icone, titulo, texto]) => (
          <div key={titulo}>
            <span className="fi"><StrokeIcon>{icone}</StrokeIcon></span>
            <h3>{titulo}</h3>
            <p>{texto}</p>
          </div>
        ))}
      </div>
      <div className="prop-cta">
        <a className="btn btn-wa btn-lg" href={waLink(produto ? produto.key : 'geral')} target="_blank" rel="noopener noreferrer">
          <IconZap size={20} />{produto ? `Quero conhecer o ${produto.nome}` : 'Falar com o comercial'}
        </a>
        <p className="note">Implantação e treinamento inclusos · Proposta com preço fechado · Atendimento pelo WhatsApp</p>
      </div>
    </>
  );
}
