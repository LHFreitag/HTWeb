import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { iniciarConsentimento } from './privacidade/consent';
// Fontes servidas pelo próprio site (sem Google Fonts: o IP do visitante não vai para o Google só para abrir a página).
import '@fontsource/sora/latin-500.css';
import '@fontsource/sora/latin-600.css';
import '@fontsource/sora/latin-700.css';
import '@fontsource/sora/latin-800.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/latin-800.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import '@fontsource/jetbrains-mono/latin-600.css';

iniciarConsentimento();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
