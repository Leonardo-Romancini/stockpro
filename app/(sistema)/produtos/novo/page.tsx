'use client'

import Link from "next/link";
import ProdutoForm from "../components/ProdutoForm";

export default function RegistrarProduto() {
    return (
        <main className="min-h-screen bg-zinc-50 font-sans antialiased">
            {/* NAVEGAÇÃO / BREADCRUMB */}
            <nav className="w-full max-w-4xl mx-auto px-4 pt-12">
                <Link 
                    href="/produtos" 
                    className="group inline-flex items-center gap-2 text-zinc-400 hover:text-blue-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest">Voltar para o estoque</span>
                </Link>
            </nav>

            <section className="pb-20">
                {/* CABEÇALHO DA PÁGINA */}
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="space-y-1 border-l-4 border-blue-600 pl-6">
                        <h1 className="text-3xl font-black text-zinc-900 uppercase italic tracking-tighter">
                            Novo <span className="text-blue-600">Produto</span>
                        </h1>
                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                            Adicione novos itens ao inventário StockPro
                        </p>
                    </div>
                </div>

                {/* FORMULÁRIO DE PRODUTO */}
                <div className="mt-4">
                    <ProdutoForm />
                </div>

                {/* RODAPÉ DE STATUS */}
                <div className="max-w-4xl mx-auto px-4 mt-8 flex items-center justify-between text-zinc-400 border-t border-zinc-200 pt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Sincronização Ativa</span>
                    </div>
                    <div className="flex items-center gap-4">
                         <span className="text-[9px] font-medium italic opacity-50 text-zinc-600">Inventory Module v3.0</span>
                    </div>
                </div>
            </section>
        </main>
    );
}