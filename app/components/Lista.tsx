'use client'

import Link from "next/link";

interface ListasProps {
  dados: any[];
  editarHref?: string;
  mostrarAcoes: boolean;
  onAlterarStatus: (item: any) => void;
}

export default function Listas({ dados, onAlterarStatus, mostrarAcoes = false, editarHref }: ListasProps) {

  const colunas = dados.length > 0 ? Object.keys(dados[0]) : [];

  if (dados.length === 0) {
    return (
      <div className="w-full p-12 text-center bg-white/50 backdrop-blur-md rounded-[2rem] border-2 border-dashed border-zinc-300">
        <span className="text-zinc-400 font-black uppercase italic tracking-widest">Nenhum registro encontrado.</span>
      </div>
    );
  }

  return (
    /* table-fixed força a tabela a respeitar a largura do container pai (100%) */
    <div className="w-full overflow-hidden rounded-[2.5rem] border-4 border-white bg-white/70 backdrop-blur-xl shadow-2xl shadow-blue-900/10">
      <table className="w-full table-fixed border-collapse text-left">
        {/* CABEÇALHO */}
        <thead>
          <tr className="bg-zinc-950 border-b border-zinc-800">
            {colunas.map((col) => (
              <th key={col} className="px-4 py-5 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] italic truncate">
                {col}
              </th>
            ))}
            {mostrarAcoes && (
              <th className="px-4 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] italic text-right w-32">
                Ações
              </th>
            )}
          </tr>
        </thead>

        {/* CORPO */}
        <tbody className="divide-y divide-zinc-100">
          {dados.map((item, index) => (
            <tr 
              key={item.id || index} 
              className="group hover:bg-blue-50/40 transition-all duration-300"
            >
              {colunas.map((col) => (
                <td key={col} className="px-4 py-4 overflow-hidden">
                  {col === 'status' ? (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                      item[col] === 'ATIVO' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' 
                      : 'bg-red-500/10 border-red-500/20 text-red-600'
                    }`}>
                      {String(item[col])}
                    </span>
                  ) : (
                    /* truncate impede que textos longos quebrem o layout, exibindo "..." */
                    <p className="text-xs font-bold text-zinc-700 group-hover:text-zinc-950 transition-colors truncate" title={String(item[col])}>
                      {String(item[col])}
                    </p>
                  )}
                </td>
              ))}

              {/* AÇÕES */}
              {mostrarAcoes && (
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`${editarHref}/${item.id}/editar`}
                      className="p-1.5 rounded-lg bg-zinc-100 text-zinc-500 hover:bg-blue-600 hover:text-white transition-all active:scale-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
                      </svg>
                    </Link>

                    <button 
                      onClick={() => onAlterarStatus?.(item)}
                      className="p-1.5 rounded-lg bg-zinc-100 text-zinc-400 hover:bg-zinc-950 hover:text-white transition-all active:scale-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}