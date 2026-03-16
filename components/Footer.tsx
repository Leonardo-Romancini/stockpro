export default function Footer(){
    const currentYear = new Date().getFullYear();

return (
  <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* LADO ESQUERDO: COPYRIGHT & LOGO */}
        <div className="flex items-center gap-3 text-sm font-medium text-zinc-400">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-500 font-black shadow-inner">
            ©
          </div>
          <p className="tracking-tight">
            {currentYear} <span className="text-white font-black italic uppercase tracking-tighter">Stock<span className="text-blue-500">Pro</span></span>. 
            <span className="hidden sm:inline"> — Todos os direitos reservados.</span>
          </p>
        </div>

        {/* LADO DIREITO: LINKS COM ESTILO DASHBOARD */}
        <div className="flex items-center gap-8">
          <a 
            href="/suporte" 
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-45 transition-transform duration-500">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
              <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
            </svg>
            Suporte
          </a>

          <div className="w-px h-4 bg-zinc-800" /> {/* Divisor Visual */}

          <a 
            href="/termos" 
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Termos
          </a>
        </div>

      </div>

      {/* LINHA DECORATIVA INFERIOR */}
      <div className="mt-8 h-1 w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full" />
    </div>
  </footer>
);
}