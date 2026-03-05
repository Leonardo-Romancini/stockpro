export default function ListaMov(){

    return (
  <main className="max-w-6xl mx-auto p-6 pt-24 space-y-10">
    
    {/* TÍTULO DINÂMICO DO PRODUTO */}
    <div className="flex flex-col items-center text-center space-y-2">
      <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
        Histórico de Movimentação
      </span>
      <h2 className="text-4xl md:text-6xl font-black text-zinc-950 tracking-tighter uppercase italic">
        {/* Aqui entrará a variável do produto, ex: {product.name} */}
        Monitor Gamer <span className="text-blue-600">Ozone 24"</span>
      </h2>
      <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-transparent rounded-full mt-2" />
    </div>

    {/* SEÇÃO DA TABELA */}
    <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-900/5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">SKU</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Tipo</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Qtd. Movimentada</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Estoque Atual</th>
            <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Data</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blue-50">
          <tr className="hover:bg-blue-50/50 transition-colors duration-200">
            <td className="px-6 py-4 text-zinc-900 font-medium">#SKU-99821</td>
            <td className="px-6 py-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                Entrada
              </span>
            </td>
            <td className="px-6 py-4 text-zinc-600 font-semibold">+ 15</td>
            <td className="px-6 py-4 text-zinc-600">42 un</td>
            <td className="px-6 py-4 text-zinc-500 text-sm italic">04 Mar, 2026</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* SEÇÃO DE CONTROLES (FORMULÁRIO) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl border border-blue-100 shadow-lg relative overflow-hidden">
      {/* Detalhe estético sutil no fundo do card */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 z-0" />
      
      <div className="space-y-4 z-10">
        <h3 className="text-xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <div className="w-2 h-6 bg-blue-600 rounded-full" />
          Nova Movimentação
        </h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="radio" name="tipo" className="w-5 h-5 border-blue-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-zinc-700 font-medium group-hover:text-blue-600 transition-colors">Entrada</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="radio" name="tipo" className="w-5 h-5 border-blue-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-zinc-700 font-medium group-hover:text-blue-600 transition-colors">Saída</span>
          </label>
        </div>
      </div>

      <div className="space-y-4 z-10">
        <label htmlFor="input-qtdmov" className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">
          Quantidade de itens
        </label>
        <div className="flex gap-3">
          <input 
            type="number" 
            id="input-qtdmov" 
            placeholder="00"
            className="w-32 px-4 py-3 rounded-xl border border-blue-100 bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-center font-bold text-blue-600"
          />
          <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-wider">
            Atualizar Estoque
          </button>
        </div>
      </div>
    </div>
  </main>
);
}