/* Migração dos cadastros de suporte para o formato das regras novas (LGPD).

   O que faz, para cada documento em `suportes` cujo ID ainda não é o UID do login:
     1. procura a conta no Firebase Auth pelo e-mail do cadastro;
     2. cria `suportes/{uid}` com nome, email, telefone, experiencia, status e dataCadastro
        (o CPF NÃO é copiado, a menos que use --manter-cpf);
     3. só apaga o documento antigo (que é onde o CPF fica) se usar --apagar-antigos.
   Chamados, novidades, treinamentos e contas de login não são tocados.

   Por padrão roda em modo SIMULAÇÃO: só mostra o que faria, sem gravar nada.

   Uso (na raiz do projeto):
     node scripts/migrar-suportes.mjs                      # simulação + backup local
     node scripts/migrar-suportes.mjs --executar           # copia para suportes/{uid}, sem CPF
     node scripts/migrar-suportes.mjs --executar --apagar-antigos   # copia e apaga os antigos (some o CPF)

   Credencial: arquivo de conta de serviço do Firebase (Configurações do projeto → Contas de serviço
   → Gerar nova chave privada), apontado por GOOGLE_APPLICATION_CREDENTIALS. Nunca commite esse arquivo. */
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { writeFileSync, mkdirSync } from 'node:fs';

const args = new Set(process.argv.slice(2));
const EXECUTAR = args.has('--executar');
const APAGAR_ANTIGOS = args.has('--apagar-antigos');
const MANTER_CPF = args.has('--manter-cpf');
const PROJETO = process.env.FIREBASE_PROJECT || 'automax-55b5e';

if (APAGAR_ANTIGOS && !EXECUTAR) {
  console.error('--apagar-antigos só funciona junto com --executar.');
  process.exit(1);
}

const NO_EMULADOR = Boolean(process.env.FIRESTORE_EMULATOR_HOST);
initializeApp(NO_EMULADOR ? { projectId: PROJETO } : { credential: applicationDefault(), projectId: PROJETO });
const db = getFirestore();
const auth = getAuth();

const CAMPOS = ['nome', 'email', 'telefone', 'experiencia', 'status', 'dataCadastro'];

const snap = await db.collection('suportes').get();
console.log(`Projeto ${PROJETO}: ${snap.size} cadastro(s) em suportes. Modo: ${EXECUTAR ? 'EXECUÇÃO' : 'SIMULAÇÃO (nada será gravado)'}\n`);

// Backup local antes de qualquer coisa. Contém CPF: guarde em local seguro e apague quando não precisar mais.
mkdirSync('backup-lgpd', { recursive: true });
const arquivo = `backup-lgpd/suportes-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
writeFileSync(arquivo, JSON.stringify(snap.docs.map((d) => ({ id: d.id, ...d.data() })), null, 2));
console.log(`Backup salvo em ${arquivo} (contém dados pessoais, não compartilhe).\n`);

const resumo = { jaMigrado: 0, copiado: 0, apagado: 0, semConta: [], conflito: [] };

for (const d of snap.docs) {
  const dados = d.data();
  const email = (dados.email || '').trim().toLowerCase();

  let uid = null;
  try {
    uid = email ? (await auth.getUserByEmail(email)).uid : null;
  } catch {
    uid = null;
  }

  if (uid === d.id) {
    resumo.jaMigrado++;
    if (!MANTER_CPF && 'cpf' in dados) {
      console.log(`• ${email}: já está no formato novo, mas ainda tem CPF → ${EXECUTAR ? 'removendo o campo' : 'removeria o campo'}`);
      if (EXECUTAR) await d.ref.update({ cpf: FieldValue.delete() });
    } else {
      console.log(`• ${email}: já está no formato novo, nada a fazer`);
    }
    continue;
  }
  if (!uid) {
    resumo.semConta.push(email || `(sem e-mail, doc ${d.id})`);
    console.log(`• ${email || d.id}: não existe conta de login com esse e-mail → mantido como está (veja no final)`);
    continue;
  }

  const destino = db.collection('suportes').doc(uid);
  const existente = await destino.get();
  if (existente.exists) {
    resumo.conflito.push(email);
    console.log(`• ${email}: já existe suportes/${uid} → não sobrescrevo; confira os dois à mão`);
    continue;
  }

  const novo = {};
  for (const c of CAMPOS) if (c in dados) novo[c] = dados[c];
  if (MANTER_CPF && 'cpf' in dados) novo.cpf = dados.cpf;
  novo.email = email;

  console.log(`• ${email}: ${EXECUTAR ? 'copiando' : 'copiaria'} ${d.id} → ${uid} (status: ${dados.status || '-'}${MANTER_CPF ? ', com CPF' : ', sem CPF'})`);
  if (EXECUTAR) {
    await destino.set(novo);
    resumo.copiado++;
    if (APAGAR_ANTIGOS) {
      await d.ref.delete();
      resumo.apagado++;
    }
  }
}

console.log('\nResumo:');
console.log(`  já no formato novo: ${resumo.jaMigrado}`);
console.log(`  copiados: ${resumo.copiado}${EXECUTAR ? '' : ' (simulação)'}`);
console.log(`  antigos apagados: ${resumo.apagado}`);
if (resumo.semConta.length) console.log(`  sem conta de login (ficaram como estão): ${resumo.semConta.join(', ')}`);
if (resumo.conflito.length) console.log(`  conflitos para conferir: ${resumo.conflito.join(', ')}`);
if (!EXECUTAR) console.log('\nNada foi gravado. Para aplicar, rode de novo com --executar.');
