'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    const handleLogin = async (formData:FormData) => {
        const email = formData.get("email");
        const senha = formData.get("senha");

        console.log(`Autentica com email: ${email}`)

        router.push("/home")
    }

return (
  <main className="min-h-screen flex flex-col overflow-x-hidden relative font-sans antialiased bg-gradient-to-br from-zinc-100 via-blue-100 to-blue-400/50">
    
    {/* Esferas de reforço visual para profundidade */}
    <div className="fixed -bottom-40 -right-20 w-[600px] h-[600px] bg-blue-500/30 blur-[130px] rounded-full pointer-events-none -z-10" />
    <div className="fixed -top-20 -left-20 w-[400px] h-[400px] bg-indigo-400/20 blur-[100px] rounded-full pointer-events-none -z-10" />

    {/* HEADER OFICIAL STOCKPRO */}
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
      <Link href="/" className="text-zinc-400 hover:text-white text-sm font-bold transition-colors">
        Voltar para Home
      </Link>
    </header>

    {/* CONTAINER DO LOGIN */}
    <div className="flex-1 flex items-center justify-center px-6 pt-20">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-[2.5rem] border-4 border-white shadow-2xl shadow-blue-900/20 overflow-hidden">
        
        {/* TOPO DO CARD */}
        <div className="bg-zinc-950 p-8 text-center space-y-2">
          <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Entrar no <span className="text-blue-500">Sistema</span>
          </h1>
        </div>

        {/* FORMULÁRIO */}
        <form action={handleLogin} className="p-8 md:p-10 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-zinc-700 uppercase tracking-widest ml-1">E-mail</label>
            <div className="relative group">
              <input 
                type="email" 
                name="email"
                placeholder="exemplo@estoque.com"
                className="w-full pl-4 pr-4 py-3 rounded-xl border-2 border-zinc-100 bg-white/50 focus:bg-white focus:border-blue-600 outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-black text-zinc-700 uppercase tracking-widest">Senha</label>
              <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline uppercase">Esqueceu a senha?</a>
            </div>
            <input 
              type="password" 
              name="senha"
              placeholder="••••••••"
              className="w-full pl-4 pr-4 py-3 rounded-xl border-2 border-zinc-100 bg-white/50 focus:bg-white focus:border-blue-600 outline-none transition-all font-medium"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic tracking-tighter text-lg rounded-xl shadow-lg shadow-blue-500/40 transition-all active:scale-95"
          >
            Acessar Painel
          </button>
        </form>

        {/* RODAPÉ DO CARD */}
        <div className="px-8 pb-8 text-center">
          <p className="text-zinc-500 text-xs font-medium">
            Não tem uma conta? <span className="text-blue-600 font-bold cursor-pointer hover:underline">Cadastre-se aqui.</span>
          </p>
        </div>
      </div>
    </div>
  </main>
);
}