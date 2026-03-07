'use client';

import { useAuth } from "../context/AuthContext";

export default function Header(){

  const{usuario,logout} = useAuth();

    return (
  <header className="w-full border-b border-blue-500/20 bg-zinc-950 sticky top-0 z-50 shadow-lg shadow-blue-900/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        
        {/* LADO ESQUERDO: LOGO & USUÁRIO */}
        <div className="flex items-center gap-6">
          {/* Logo Minimalista para o Dashboard */}
          <div className="flex items-center gap-2 border-r border-zinc-800 pr-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m7.5 4.27 9 5.15" />
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            </svg>
            <p className="text-xl font-black tracking-tighter uppercase italic hidden md:block">
              <span className="text-white">Stock</span>
              <span className="text-blue-500">Pro</span>
            </p>
          </div>

          {/* Identificação do Usuário com Cores do Tema */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 border-2 border-blue-400/30 shadow-blue-500/20 shadow-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight leading-none">
                {usuario?.name.toLocaleUpperCase()||'Usuário indefinido!'}
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] font-black text-blue-500 mt-1">
                Admin <span className="text-zinc-500 font-medium">| Painel de Estoque</span>
              </span>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: AÇÕES & STATUS */}
        <div className="flex items-center gap-4">
          {/* Badge de Status Online (Opcional, mas visual) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase">Sistema Online</span>
          </div>

          <button 
            type="button"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all duration-300 active:scale-95 shadow-md"
            onClick={logout}
          >
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Sair</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
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