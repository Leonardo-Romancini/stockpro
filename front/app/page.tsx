import Link from "next/link";

export default function LandPage() {
return (
    <main className="min-h-screen flex flex-col overflow-x-hidden relative font-sans antialiased bg-gradient-to-br from-zinc-100 via-blue-100 to-blue-400/50">
      
      {/* Esfera de reforço visual - Opacidade e brilho aumentados para um gradiente mais dramático */}
      <div className="fixed -bottom-40 -right-20 w-[600px] h-[600px] bg-blue-500/30 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="fixed top-1/4 -left-20 w-[400px] h-[400px] bg-indigo-400/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* HEADER - Zinc-950 para contraste máximo com o fundo mais azulado */}
      <header className="w-full h-20 flex items-center justify-between px-6 md:px-12 border-b border-zinc-800 bg-zinc-950 shadow-2xl fixed top-0 z-50">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
          <p className="text-2xl font-black tracking-tighter uppercase italic">
            <span className="text-white">Stock</span>
            <span className="text-blue-500">Pro</span>
          </p>
        </div>

        <div>
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-blue-600 text-sm font-bold text-white hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/40 active:scale-95"
          >
            Entrar
          </Link>
        </div>
      </header>

      {/* SEÇÃO HERO */}
      <section className="flex-1 flex flex-col lg:flex-row items-center justify-center pt-32 pb-20 px-6 max-w-7xl mx-auto w-full gap-12 lg:gap-20">
        
        {/* LADO ESQUERDO: TEXTO */}
        <div className="flex-1 space-y-8 text-left items-start max-w-xl">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
              Controle de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-zinc-900">
                Estoque e Vendas
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-700 leading-relaxed font-bold">
              Providenciamos serviços de controle de estoque e vendas, ajudando pequenos negócios a monitorar seu estoque de produtos com precisão e simplicidade.
            </p>
          </div>

          <div className="pt-2">
            <button className="group relative px-10 py-4 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-xl transition-all duration-300 shadow-2xl shadow-zinc-950/40 active:scale-95">
              <span className="flex items-center gap-3">
                Trabalhe conosco
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* LADO DIREITO: IMAGEM */}
        <div className="flex-1 w-full max-w-[550px] lg:max-w-none relative group">
          {/* Brilho traseiro da imagem mais intenso */}
          <div className="absolute -inset-4 bg-blue-600/30 blur-3xl rounded-full opacity-80 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-2xl shadow-blue-900/20">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop" 
              alt="Armazém Moderno StockPro"
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

      </section>
    </main>
);
}
