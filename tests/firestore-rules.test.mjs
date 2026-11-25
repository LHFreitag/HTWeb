// Testes das regras do Firestore (LGPD art. 46). Rodar: npm run test:rules  (precisa de Java 21; usa o emulador, não toca no projeto real)
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';
import { doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, collection, getDocs, query, where, serverTimestamp } from 'firebase/firestore';

const env = await initializeTestEnvironment({ projectId: 'demo-ht', firestore: { rules: readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8'), host: '127.0.0.1', port: 8085 } });
await env.withSecurityRulesDisabled(async (c) => {
  const db = c.firestore();
  await setDoc(doc(db, 'admins/adm'), { nome: 'Admin' });
  await setDoc(doc(db, 'suportes/sup'), { nome: 'S', email: 'sup@x.com', status: 'aprovado' });
  await setDoc(doc(db, 'suportes/legadoRandom'), { nome: 'L', email: 'leg@x.com', status: 'aprovado' });
  await setDoc(doc(db, 'suportes/pend'), { nome: 'P', email: 'pend@x.com', status: 'aguardando_aprovacao' });
  await setDoc(doc(db, 'chamados/c1'), { titulo: 't', email: 'a@b.c', status: 'pendente' });
  await setDoc(doc(db, 'novidades/n1'), { t: 1 });
  await setDoc(doc(db, 'consentimentos/k1'), { tipo: 'GRANTED' });
});
const anon = env.unauthenticatedContext().firestore();
const adm = env.authenticatedContext('adm', { email: 'adm@x.com' }).firestore();
const sup = env.authenticatedContext('sup', { email: 'sup@x.com' }).firestore();
const pend = env.authenticatedContext('pend', { email: 'pend@x.com' }).firestore();
const leg = env.authenticatedContext('legUid', { email: 'leg@x.com' }).firestore();
const novo = env.authenticatedContext('novo', { email: 'novo@x.com' }).firestore();

const chamado = { titulo: 'NF-e', descricao: 'x', email: 'a@b.c', telefone: '', categoria: 'geral', prioridade: 'normal', status: 'pendente', dataCriacao: serverTimestamp(), dataAtualizacao: serverTimestamp() };
const t = [];
const ok = (n, p) => t.push([n, assertSucceeds(p)]);
const no = (n, p) => t.push([n, assertFails(p)]);

ok('anon cria chamado', addDoc(collection(anon, 'chamados'), chamado));
no('anon cria chamado com campo extra', addDoc(collection(anon, 'chamados'), { ...chamado, cpf: '1' }));
no('anon cria chamado ja resolvido', addDoc(collection(anon, 'chamados'), { ...chamado, status: 'resolvido' }));
no('anon le chamados', getDocs(collection(anon, 'chamados')));
no('anon apaga chamado', deleteDoc(doc(anon, 'chamados/c1')));
no('suporte pendente le chamados', getDocs(collection(pend, 'chamados')));
ok('suporte aprovado le chamados', getDocs(collection(sup, 'chamados')));
ok('suporte aprovado atualiza chamado', updateDoc(doc(sup, 'chamados/c1'), { status: 'em_andamento' }));
no('suporte aprovado apaga chamado', deleteDoc(doc(sup, 'chamados/c1')));
ok('admin le chamados', getDocs(collection(adm, 'chamados')));
ok('anon le novidades', getDocs(collection(anon, 'novidades')));
no('anon escreve novidades', setDoc(doc(anon, 'novidades/n2'), { a: 1 }));
no('suporte escreve novidades', setDoc(doc(sup, 'novidades/n2'), { a: 1 }));
ok('admin escreve novidades', setDoc(doc(adm, 'novidades/n2'), { a: 1 }));
ok('admin le proprio admins', getDoc(doc(adm, 'admins/adm')));
ok('nao-admin le admins/{proprio uid} inexistente', getDoc(doc(sup, 'admins/sup')));
no('nao-admin se torna admin', setDoc(doc(sup, 'admins/sup'), { a: 1 }));
no('anon lista suportes', getDocs(collection(anon, 'suportes')));
no('suporte lista todos suportes', getDocs(collection(sup, 'suportes')));
ok('suporte le proprio doc', getDoc(doc(sup, 'suportes/sup')));
ok('novo le suportes/{uid} inexistente', getDoc(doc(novo, 'suportes/novo')));
ok('legado consulta por email', getDocs(query(collection(leg, 'suportes'), where('email', '==', 'leg@x.com'))));
ok('login consulta email+status', getDocs(query(collection(leg, 'suportes'), where('email', '==', 'leg@x.com'), where('status', '==', 'aprovado'))));
no('consulta email de outro', getDocs(query(collection(leg, 'suportes'), where('email', '==', 'sup@x.com'))));
ok('admin lista suportes', getDocs(collection(adm, 'suportes')));
ok('admin aprova suporte', updateDoc(doc(adm, 'suportes/pend'), { status: 'aprovado' }));
no('pendente se autoaprova', updateDoc(doc(pend, 'suportes/pend'), { status: 'aprovado' }));
ok('novo cria proprio cadastro', setDoc(doc(novo, 'suportes/novo'), { nome: 'N', email: 'novo@x.com', telefone: '65', experiencia: 'iniciante', status: 'aguardando_aprovacao', dataCadastro: serverTimestamp() }));
no('cadastro ja aprovado', setDoc(doc(novo, 'suportes/novo2'), { nome: 'N', email: 'novo@x.com', status: 'aprovado', dataCadastro: serverTimestamp() }));
no('cadastro com CPF', setDoc(doc(env.authenticatedContext('n3', { email: 'n3@x.com' }).firestore(), 'suportes/n3'), { nome: 'N', email: 'n3@x.com', cpf: '1', experiencia: 'x', status: 'aguardando_aprovacao', dataCadastro: serverTimestamp() }));
ok('anon cria lead', addDoc(collection(anon, 'leads'), { produto: 'Mettre', nome: 'Ana', whatsapp: '65999', cidade: 'Cuiabá', email: '', unidades: '1', sistemaAtual: 'x', resumo: 'r', baseLegal: 'v', consentimentos: [], criadoEm: serverTimestamp() }));
no('anon le leads', getDocs(collection(anon, 'leads')));
no('suporte le leads', getDocs(collection(sup, 'leads')));
ok('admin le leads', getDocs(collection(adm, 'leads')));
ok('anon registra consentimento', addDoc(collection(anon, 'consentimentos'), { tipo: 'GRANTED', finalidade: 'marketing_whatsapp_email', versaoPolitica: '2026-11-23', textoApresentado: 'Quero...', registradoEm: serverTimestamp() }));
no('admin altera consentimento', updateDoc(doc(adm, 'consentimentos/k1'), { tipo: 'REVOKED' }));
no('admin apaga consentimento', deleteDoc(doc(adm, 'consentimentos/k1')));
no('colecao desconhecida', setDoc(doc(adm, 'qualquer/x'), { a: 1 }));

let falhas = 0;
for (const [n, p] of t) {
  try { await p; console.log('PASS', n); } catch (e) { falhas++; console.log('FAIL', n, e.message.split('\n')[0]); }
}
await env.cleanup();
console.log(falhas ? `${falhas} falha(s)` : 'todos passaram');
process.exit(falhas ? 1 : 0);
