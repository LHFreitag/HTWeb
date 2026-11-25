import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [usuarioEmail, setUsuarioEmail] = useState('');
  const [usuarioNome, setUsuarioNome] = useState('');
  const [usuarioTipo, setUsuarioTipo] = useState('cliente');
  const [carregando, setCarregando] = useState(true);
  const [usuarioAutorizado, setUsuarioAutorizado] = useState(false);

  const [usuarioAdmin, setUsuarioAdmin] = useState(false);

  useEffect(() => {
    // Limpa dados pessoais que versões antigas guardavam no navegador (minimização, LGPD art. 6º, III).
    ['automax_usuario_email', 'automax_usuario_nome', 'automax_usuario_tipo', 'automax_usuario_autorizado', 'automax_admin_token']
      .forEach((k) => { try { localStorage.removeItem(k); } catch { /* sem armazenamento */ } });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUsuarioEmail(firebaseUser.email);

        // Admin: a pessoa precisa ter um documento em admins/{uid}, criado à mão no console do Firebase.
        // O papel vale também no servidor: as regras do Firestore conferem o mesmo documento.
        try {
          const adminSnap = await getDoc(doc(db, 'admins', firebaseUser.uid));
          setUsuarioAdmin(adminSnap.exists());
        } catch {
          setUsuarioAdmin(false);
        }

        try {
          // Membro de suporte: documento suportes/{uid} (cadastros novos) ou, nos cadastros antigos,
          // o documento com o mesmo e-mail do login.
          let suporteData = null;
          const porUid = await getDoc(doc(db, 'suportes', firebaseUser.uid));
          if (porUid.exists()) {
            suporteData = porUid.data();
          } else {
            const snap = await getDocs(query(collection(db, 'suportes'), where('email', '==', firebaseUser.email)));
            if (!snap.empty) suporteData = snap.docs[0].data();
          }

          if (suporteData) {
            setUsuarioTipo('suporte');
            setUsuarioAutorizado(suporteData.status === 'aprovado');
            setUsuarioNome(suporteData.nome || '');
          } else {
            setUsuarioTipo('cliente');
            setUsuarioAutorizado(false);
            setUsuarioNome('');
          }
        } catch {
          // Sem acesso ao cadastro: trata como cliente. Nunca confia em valor guardado no navegador.
          setUsuarioTipo('cliente');
          setUsuarioAutorizado(false);
        }

        setUsuarioAutenticado(true);
      } else {
        setUsuarioEmail('');
        setUsuarioNome('');
        setUsuarioTipo('cliente');
        setUsuarioAutorizado(false);
        setUsuarioAdmin(false);
        setUsuarioAutenticado(false);
      }
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  const registrar = async (email, senha) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, senha) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  // Chamado pelo formulário de login do suporte depois de validar o cadastro aprovado.
  // Só atualiza o estado em memória; nada de dados pessoais no localStorage.
  const autenticar = (email, tipo = 'cliente', autorizado = false) => {
    setUsuarioEmail(email);
    setUsuarioTipo(tipo);
    setUsuarioAutenticado(true);
    setUsuarioAutorizado(autorizado);
  };

  const desautenticar = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao desautenticar:', error);
    }
  };

  // Sair do painel administrativo = encerrar a sessão do Firebase Auth.
  const sairAdmin = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  // Mantido com o mesmo nome para as telas que já usavam: agora reflete o papel real (admins/{uid}).
  const isAdminAutenticado = () => usuarioAdmin;

  const registrarComGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const loginComGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuarioAutenticado,
        usuarioEmail,
        usuarioNome,
        usuarioTipo,
        usuarioAutorizado,
        usuarioAdmin,
        carregando,
        registrar,
        login,
        logout,
        registrarComGoogle,
        loginComGoogle,
        autenticar,
        desautenticar,
        sairAdmin,
        isAdminAutenticado,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return contexto;
}
