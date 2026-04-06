import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-64 bg-zinc-950 text-white flex flex-col border-r border-zinc-800 shadow-2xl">

      {/* Header / Logo - Agora combinando com o estilo dos formulários */}
      <div className="p-8 border-b border-zinc-900 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center rotate-3">
          <span className="text-xl">📦</span>
        </div>
        <span className="text-xl font-black uppercase italic tracking-tighter">
          Stock<span className="text-blue-500 text-2xl">Pro</span>
        </span>
      </div>

      {/* Navegação */}
      <nav className="flex-1 p-4 pt-8 space-y-2 overflow-y-auto">
        
        {/* Helper para as rotas */}
        {[
          { name: "Home", href: "/home", icon: "🏠" },
          { name: "Fornecedores", href: "/fornecedores", icon: "👥" },
          { name: "Produtos", href: "/produtos", icon: "🏷️" },
          { name: "Movimentações", href: "/movimentacoes", icon: "🔄" },
          { name: "Usuários", href: "/usuarios", icon: "👤" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all hover:bg-zinc-900 hover:translate-x-1 group border border-transparent hover:border-zinc-800"
          >
            <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
              {item.icon}
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-blue-500 transition-colors">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer da Sidebar */}
      <div className="p-6 border-t border-zinc-900">
        <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50 flex flex-col items-center gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Versão</span>
          <span className="text-[11px] font-bold text-zinc-400 italic">v3.0.4 - Enterprise</span>
        </div>
      </div>
    </aside>
  );
}