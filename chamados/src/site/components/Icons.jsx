export function Logo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#0a0e1c" />
      <path d="M8 19 20 9l12 10" fill="none" stroke="#f0b429" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 21v10M13 26h7M20 21v10" fill="none" stroke="#e0eaf5" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24 21h6M27 21v10" fill="none" stroke="#5ba3e0" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconStore({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16M4 9.5c0 1.5 1.2 2.5 2.7 2.5s2.6-1 2.6-2.5c0 1.5 1.2 2.5 2.7 2.5s2.7-1 2.7-2.5c0 1.5 1.1 2.5 2.6 2.5S20 11 20 9.5M5.5 12v8h13v-8M10 20v-5h4v5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function IconFood({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v8m-2.5-8v5a2.5 2.5 0 0 0 5 0V3M7 11v10M16.5 3c-2 0-3 2.5-3 6v4h3v8m0-18v18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconZap({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.8 8.3c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .5-.1.7l-.5.6c-.1.2-.2.4 0 .6.6 1 1.4 1.8 2.5 2.3.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5 0 .9-.8 1.7-1.7 1.8-1 .1-2.4-.3-4.2-1.8-1.6-1.4-2.4-2.9-2.6-3.9-.2-1 .1-1.8.4-2.4Z" fill="currentColor" />
    </svg>
  );
}

export function ProductIcon({ produto, size }) {
  return produto.key === 'mettre' ? <IconFood size={size} /> : <IconStore size={size} />;
}

/* Ícone de traço 24x24 a partir de um "d" de path (cartões de recurso, passos, proposta). */
export function StrokeIcon({ children, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
