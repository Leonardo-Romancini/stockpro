"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store"; // Ajuste o caminho conforme a sua estrutura

export default function Sidebar() {
  // Acessamos o estado 'auth' que você definiu no store
  const { usuario } = useSelector((state: RootState) => state.auth);

  const navItems = [
    { name: "Home", href: "/home", icon: "🏠" },
    { name: "Fornecedores", href: "/fornecedores", icon: "👥" },
    { name: "Produtos", href: "/produtos", icon: "🏷️" },
    { name: "Movimentações", href: "/movimentacao", icon: "🔄" },
  ];

  return (
    <aside className="sticky top-0 h-screen w-64 bg-zinc-950 text-white flex flex-col border-r border-zinc-800 shadow-2xl">
      {/* Header / Logo */}
      <div className="p-8 border-b border-zinc-900 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center rotate-3">
          <span className="text-xl">📦</span>
        </div>
        <span className="text-xl font-black uppercase italic tracking-tighter">
          Stock<span className="text-blue-500 text-2xl">Pro</span>
        </span>
      </div>

      <nav className="flex-1 p-4 pt-8 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all hover:bg-zinc-900 hover:translate-x-1 group border border-transparent hover:border-zinc-800"
          >
            <span className="text-lg opacity-70 group-hover:opacity-100">{item.icon}</span>
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-blue-500">
              {item.name}
            </span>
          </Link>
        ))}

        {/* Renderiza link "Usuários" apenas para ADMIN */}
        {usuario?.role === "ROLE_ADMIN" && (
          <Link
            href="/usuarios"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all hover:bg-zinc-900 hover:translate-x-1 group border border-transparent hover:border-zinc-800"
          >
            <span className="text-lg opacity-70 group-hover:opacity-100">👤</span>
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-blue-500">
              Usuários
            </span>
          </Link>
        )}
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