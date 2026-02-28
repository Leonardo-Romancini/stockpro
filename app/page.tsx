import Link from "next/link";

export default function LandPage() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden relative font-sans antialiased bg-gradient-to-br from-white via-blue-50 to-blue-300/40">
      
      {/* Esfera de reforço visual no canto inferior */}
      <div className="fixed -bottom-20 -right-20 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* HEADER */}
      <header className="w-full h-20 flex items-center justify-between px-6 md:px-12 border-b border-blue-400/20 bg-blue-600 shadow-lg fixed top-0 z-50">
        <div className="flex items-center gap-2">
          {/* Logo SVG - Ícone permanece em Branco */}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
          {/* Texto da Logo: Stock em Preto e Pro em Branco */}
          <p className="text-2xl font-black tracking-tighter uppercase italic">
            <span className="text-zinc-950">Stock</span>
            <span className="text-white">Pro</span>
          </p>
        </div>

        <div>
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-white text-sm font-bold text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-md active:scale-95"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
                Estoque e Vendas
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-medium">
              Providenciamos serviços de controle de estoque e vendas, ajudando pequenos negócios a monitorar seu estoque de produtos com precisão e simplicidade.
            </p>
          </div>

          <div className="pt-2">
            <button className="group relative px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-xl shadow-blue-500/20 active:scale-95">
              <span className="flex items-center gap-3">
                Trabalhe conosco
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* LADO DIREITO: IMAGEM */}
        <div className="flex-1 w-full max-w-[550px] lg:max-w-none relative group">
          <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-2xl shadow-blue-900/10">
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
