'use client'


import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProdutoForm from "../../components/ProdutoForm";
import { Produto } from "@/app/types/produtos";

export default function EditarProduto() {
    
    const router = useRouter();
    const params = useParams();
    const codigo = Number(params.codigo);

    const [produto, setProduto] = useState<Produto | null>(null);

    useEffect(() => {
        buscarDados();
    }, []);

    const buscarDados = async () => {
        try {
            const response = await axios.get<Produto>('http://localhost:8080/produtos/' + codigo)
            if (response.data) {
                setProduto(response.data)
            } else {
                router.push("/produtos")
            }
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            router.push("/produtos");
        }
    }

    // TELA DE CARREGAMENTO PADRONIZADA
    if (!produto) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-sans">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-zinc-200 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">Buscando Produto...</p>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-zinc-50 font-sans antialiased">

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

                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-2xl font-black text-zinc-900 uppercase italic tracking-tighter">
                            Editar <span className="text-blue-600">Produto</span>
                        </h1>
                        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-200 rounded-full">
                             <span className="text-[10px] font-black text-zinc-600 uppercase tracking-tighter">ID</span>
                             <span className="text-[10px] font-black text-blue-600">#{codigo}</span>
                        </div>
                    </div>
                    <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-1 ml-1">
                        Atualize as informações de inventário
                    </p>
                </div>


                <ProdutoForm produtoExistente={produto} />
            </section>
        </main>
    )
}