'use client'


import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import FornecedorForm from "../../components/FornecedorForm";
import { Fornecedor } from "@/app/types/fornecedores";
import { fornecedorPorId } from "@/app/services/fornecedorService";

export default function EditarFornecedor() {
    
    const router = useRouter();
    const params = useParams();
    const codigo = Number(params.codigo);

    const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);

    useEffect(() => {
        buscarDados();
    }, []);

    const buscarDados = async () => {
        try {
            if (await fornecedorPorId(codigo)) {
                setFornecedor(await fornecedorPorId(codigo))
            } else {
                router.push("/fornecedores")
            }
        } catch (error) {
            console.error("Erro ao buscar fornecedor:", error);
            router.push("/fornecedores");
        }
    }

    // TELA DE CARREGAMENTO ESTILIZADA
    if (!fornecedor) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-sans">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-zinc-200 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">Carregando Dados...</p>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-zinc-50 font-sans antialiased">
            {/* BARRA DE NAVEGAÇÃO SUPERIOR (BREADCRUMB) */}
            <nav className="w-full max-w-4xl mx-auto px-4 pt-12">
                <Link 
                    href="/fornecedores" 
                    className="group inline-flex items-center gap-2 text-zinc-400 hover:text-blue-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest">Voltar para listagem</span>
                </Link>
            </nav>

            <section className="pb-20">
                {/* CABEÇALHO DE IDENTIFICAÇÃO DA EDIÇÃO */}
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-2xl font-black text-zinc-900 uppercase italic tracking-tighter">
                            Editar <span className="text-blue-600">Fornecedor</span>
                        </h1>
                        <span className="px-3 py-1 bg-zinc-200 text-zinc-600 text-[10px] font-black rounded-full">
                            #{codigo}
                        </span>
                    </div>
                </div>

                {/* FORMULÁRIO JÁ ESTILIZADO */}
                <FornecedorForm fornecedorExistente={fornecedor} />
            </section>
        </main>
    )
}