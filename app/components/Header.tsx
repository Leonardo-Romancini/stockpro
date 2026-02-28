'use client';

export default function Header(){
    return (
    <header className="w-full border-b border-zinc-200 bg-zinc-50/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Lado Esquerdo: Identificação do Usuário */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-zinc-300 shadow-sm text-zinc-500">
              {/* SVG User - W3C Standard */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-800 tracking-tight leading-none">
                Leonardo Vieira
              </span>
              <span className="text-[11px] uppercase tracking-wider font-medium text-zinc-500 mt-1">
                Painel de Estoque
              </span>
            </div>
          </div>

          {/* Lado Direito: Ações */}
          <div className="flex items-center">
            <button 
              type="button"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-200 active:scale-95 shadow-sm"
              onClick={() => console.log('Saindo...')}
            >
              <span className="text-sm font-semibold hidden sm:inline">Sair</span>
              {/* SVG Logout - W3C Standard */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}