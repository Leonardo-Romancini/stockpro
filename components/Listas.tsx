export default function Listas() {
    return (
  <div className="w-full max-w-[98%] mx-auto py-8">
    
    {/* CONTAINER DAS DUAS COLUNAS */}
    <div className="flex flex-col xl:flex-row gap-8 justify-center items-start">
      
      {/* COLUNA 1: LISTAGEM GERAL */}
      <div className="flex-1 w-full flex flex-col">
        {/* Header com altura fixa para alinhar o topo das tabelas */}
        <div className="h-24 flex flex-col justify-end pb-4 px-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-xl font-black text-zinc-900 uppercase italic tracking-tighter">
                <span className="text-blue-600">Listagem</span> de produtos
              </h4>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Base Geral</p>
            </div>
            
            {/* BARRA DE PESQUISA */}
            <div className="relative group">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 group-focus-within:text-blue-600 transition-colors">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
              </span>
              <input 
                type="text" 
                id="input-pesquisa"
                placeholder="Buscar SKU ou Nome..."
                className="pl-9 pr-4 py-2 bg-white border border-blue-100 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm w-full sm:w-56"
              />
            </div>
          </div>
        </div>

        {/* TABELA 1 */}
        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-900/5">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest">Nome</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest">SKU</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest">Estoque</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest">Preço</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest">Fornecedor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              <tr className="hover:bg-blue-50/50 transition-colors">
                <td className="px-4 py-4 text-zinc-900 font-semibold text-sm whitespace-nowrap">Cadeira Gamer Z</td>
                <td className="px-4 py-4 text-zinc-500 text-xs font-mono">#GA-990</td>
                <td className="px-4 py-4 text-zinc-600 text-sm">45 un</td>
                <td className="px-4 py-4 text-blue-600 font-bold text-sm">R$ 899</td>
                <td className="px-4 py-4 text-zinc-500 text-xs uppercase font-medium">Alpha Mobili</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* COLUNA 2: ESTOQUE BAIXO */}
      <div className="flex-1 w-full flex flex-col">
        {/* Div idêntica em altura (h-24) para garantir o alinhamento perfeito do topo */}
        <div className="h-24 flex flex-col justify-end pb-4 px-2">
          <div className="space-y-1">
            <h4 className="text-xl font-black text-zinc-900 uppercase italic tracking-tighter">
              Estoque <span className="text-red-500">Crítico</span>
            </h4>
            <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest animate-pulse">Reposição Imediata</p>
          </div>
        </div>

        {/* TABELA 2 */}
        <div className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-xl shadow-red-900/5">
          <table className="w-full text-left border-collapse">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest">Nome</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest">SKU</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest">Estoque</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest">Preço</th>
                <th className="px-4 py-4 font-bold uppercase text-[10px] tracking-widest">Fornecedor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-50">
              <tr className="hover:bg-red-50/50 transition-colors">
                <td className="px-4 py-4 text-zinc-900 font-semibold text-sm whitespace-nowrap">Mouse Wireless</td>
                <td className="px-4 py-4 text-zinc-500 text-xs font-mono">#MW-002</td>
                <td className="px-4 py-4 text-red-600 font-black text-sm">02 un</td>
                <td className="px-4 py-4 text-zinc-600 font-bold text-sm">R$ 120</td>
                <td className="px-4 py-4 text-zinc-500 text-xs uppercase font-medium">Logi Tech</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
);
}