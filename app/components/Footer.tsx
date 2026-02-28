export default function Footer(){
    const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 bg-white py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Copyright com Ano Dinâmico */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
            <span className="flex items-center justify-center w-5 h-5 rounded-md bg-zinc-100 text-[10px] border border-zinc-200">
              ©
            </span>
            <p>
              {currentYear} <span className="text-zinc-900 font-semibold">StockPro</span>. 
              Todos os direitos reservados.
            </p>
          </div>

          {/* Links de Navegação com SVGs W3C */}
          <div className="flex items-center gap-6">
            <a 
              href="/suporte" 
              className="group flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200"
            >
              {/* SVG Suporte/Lifebuoy */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
              </svg>
              Suporte
            </a>

            <a 
              href="/termos" 
              className="group flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200"
            >
              {/* SVG Termos/File-Text */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
              Termos de uso
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}