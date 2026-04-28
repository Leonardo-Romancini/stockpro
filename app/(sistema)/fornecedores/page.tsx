'use client'

import Listas from "@/app/components/Lista";
import { alterarStatusFornecedor, buscarListaFornecedores } from "@/app/services/fornecedorService";
import { Fornecedor } from "@/app/types/fornecedores";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Fornecedores() {
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

    useEffect(() => { carregarDados(); }, []);

    const carregarDados = async () => {
        try {
            const dados = await buscarListaFornecedores()
            setFornecedores(dados);
        } catch (error) { 
            alert("Erro ao carregar os dados!")
            console.error(error);
         }
    }

    const handlerAlterarStatus = async (fornecedor: Fornecedor) => {
        try {
            await alterarStatusFornecedor(fornecedor);
            carregarDados();
        } catch (error) { alert("Erro ao alterar status!"); }
    }

    return (
        <main className="min-h-screen flex flex-col font-sans antialiased bg-zinc-100">
            <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-8">
                
                <div className="w-full bg-zinc-950 rounded-[2rem] p-8 md:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                            Gestão de <span className="text-blue-500">Fornecedores</span>
                        </h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Parceiros comerciais</p>
                    </div>

                    <Link 
                        href="/fornecedores/novo"
                        className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-black uppercase italic tracking-tighter text-sm rounded-xl border-2 border-zinc-700 transition-all"
                    >
                        + Novo Fornecedor
                    </Link>
                </div>

                <div className="bg-white rounded-[2rem] border-2 border-zinc-200 shadow-sm overflow-hidden">
                    <Listas 
                        dados={fornecedores} 
                        onAlterarStatus={handlerAlterarStatus} 
                        mostrarAcoes={true} 
                        editarHref="fornecedores" 
                    />
                </div>
            </section>
        </main>
    );
}