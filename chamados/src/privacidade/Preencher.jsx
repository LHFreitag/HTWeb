/* Mostra um dado da empresa ou, se ainda não foi preenchido em empresa.js, um aviso bem visível. */
export default function Preencher({ valor, rotulo }) {
  if (valor) return <>{valor}</>;
  return <mark className="a-preencher" title="Preencher em chamados/src/privacidade/empresa.js">[a preencher: {rotulo}]</mark>;
}
