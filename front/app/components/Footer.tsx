export default function Footer(){
    const currentYear = new Date().getFullYear();

return (
  <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* LADO ESQUERDO: COPYRIGHT & LOGO */}
        <div className="flex items-center gap-3 text-sm font-medium text-zinc-400">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-500 font-black shadow-inner">
            ©
          </div>
          <p className="tracking-tight">
            {currentYear} <span className="text-white font-black italic uppercase tracking-tighter">Stock<span className="text-blue-500">Pro</span></span>. 
            <span className="hidden sm:inline"> — Todos os direitos reservados.</span>
          </p>
        </div>

        {/* LADO DIREITO: LINKS COM ESTILO DASHBOARD */}
        <div className="flex items-center gap-8">
         
        </div>

      </div>

      {/* LINHA DECORATIVA INFERIOR */}
      <div className="mt-8 h-1 w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full" />
    </div>
  </footer>
);
}