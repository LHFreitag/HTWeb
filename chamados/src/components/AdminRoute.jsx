import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SuporteLoginForm from './SuporteLoginForm';
import './SuporteLoginForm.css';

/* Protege as telas do painel administrativo (/suporte, /suporte/autoriza, /suporte/novidades,
   /suporte/treinamentos). Substitui o antigo token VITE_ADMIN_TOKEN, que ia junto no JavaScript
   do site e podia ser lido por qualquer visitante.

   Quem é admin: usuário do Firebase Auth com um documento em admins/{uid} (criado no console do
   Firebase). As regras do Firestore conferem o mesmo documento, então o bloqueio vale no servidor
   e não só na tela. */
export default function AdminRoute({ children }) {
  const { carregando, usuarioAutenticado, usuarioAdmin, usuarioEmail, sairAdmin } = useAuth();

  if (carregando) {
    return (
      <div className="suporte-login-form"><div className="login-card"><p>Carregando...</p></div></div>
    );
  }

  if (!usuarioAutenticado) return <SuporteLoginForm modo="admin" />;

  if (!usuarioAdmin) {
    return (
      <div className="suporte-login-form">
        <div className="login-card">
          <h2>Acesso restrito</h2>
          <p>
            A conta <strong>{usuarioEmail}</strong> não tem permissão de administrador.
            Peça a um administrador para liberar o seu acesso.
          </p>
          <button type="button" className="btn-login" onClick={sairAdmin}>Entrar com outra conta</button>
        </div>
      </div>
    );
  }

  return children;
}
