import Link from "next/link";

export default function Sidebar(){

return (
  /* Removido 'fixed', 'left-0', 'top-0'. 
     Mantido 'w-64' para ocupar espaço no grid flex.
     Adicionado 'sticky top-0' para ela não rolar com a página.
  */
  <aside className="sticky top-0 h-screen w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 shadow-xl">
    
    {/* Header / Logo */}
    <div className="p-6 text-2xl font-bold tracking-tight border-b border-slate-800 flex items-center gap-2">
      <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center">
        <span className="text-xl">📦</span>
      </div>
      <span>Stock<span className="text-blue-500">Pro</span></span>
    </div>

    {/* Navegação */}
    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
      <Link 
        href="/home" 
        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-slate-800 hover:text-blue-400 group"
      >
        <span className="text-slate-400 group-hover:text-blue-400 transition-colors">🏠</span>
        <span className="font-medium">Home</span>
      </Link>

      <Link 
        href="/fornecedores" 
        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-slate-800 hover:text-blue-400 group"
      >
        <span className="text-slate-400 group-hover:text-blue-400 transition-colors">👥</span>
        <span className="font-medium">Fornecedores</span>
      </Link>
    </nav>

    {/* Footer da Sidebar */}
    <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
      v1.0.0
    </div>
  </aside>
);
}