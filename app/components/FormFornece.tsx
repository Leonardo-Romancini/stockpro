export default function FormFornece() {
    return (
  <div className="w-full max-w-5xl mx-auto py-8 space-y-10">
    
    {/* TÍTULO DA PÁGINA */}
    <div className="text-center space-y-2">
      <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter uppercase italic">
        Cadastro de <span className="text-blue-600">Fornecedores</span>
      </h2>
      <p className="text-zinc-500 font-medium text-sm uppercase tracking-widest">Gerenciamento de parcerias e logística</p>
    </div>

    {/* FORMULÁRIO DE CADASTRO */}
    <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-xl shadow-blue-900/5 relative overflow-hidden">
      {/* Detalhe decorativo sutil */}
      <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-blue-600 to-transparent" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="input-razaosocial" className="block text-xs font-black text-zinc-700 uppercase tracking-wider ml-1">
            Razão social
          </label>
          <input 
            type="text" 
            id="input-razaosocial" 
            placeholder="Ex: Tech Solutions LTDA"
            className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="input-cnpj" className="block text-xs font-black text-zinc-700 uppercase tracking-wider ml-1">
            CNPJ
          </label>
          <input 
            type="text" 
            id="input-cnpj" 
            placeholder="00.000.000/0000-00"
            className="w-full px-4 py-3 rounded-xl border border-blue-100 bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic tracking-tighter rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
          Cadastrar Fornecedor
        </button>
      </div>
    </div>

    {/* TABELA DE FORNECEDORES */}
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] px-2">Fornecedores Ativos</h3>
      
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-900/5">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-950 text-white">
            <tr>
              <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest">Id</th>
              <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest">Razão Social</th>
              <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest">CNPJ</th>
              <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            <tr className="hover:bg-blue-50/50 transition-colors group">
              <td className="px-6 py-4 text-zinc-500 text-xs font-mono">#001</td>
              <td className="px-6 py-4 text-zinc-900 font-bold text-sm">Distribuidora Alpha</td>
              <td className="px-6 py-4 text-zinc-600 text-sm">12.345.678/0001-90</td>
              <td className="px-6 py-4 text-right">
                <button className="text-blue-600 font-bold text-xs uppercase hover:underline">Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}