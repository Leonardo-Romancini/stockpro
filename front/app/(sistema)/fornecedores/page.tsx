'use client'

import Listas from "@/app/components/Lista";
import { alterarStatusFornecedor, buscarListaFornecedores } from "@/app/services/fornecedorService";
import { Fornecedor } from "@/app/types/fornecedores";
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
        <main className="min-h-screen flex flex-col font-sans antialiased bg-zinc-50">
    <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-8">
        
        {/* HEADER */}
        <div className="w-full bg-zinc-950 rounded-[2rem] p-8 md:p-10 border-b border-zinc-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                    Gestão de <span className="text-blue-500">Fornecedores</span>
                </h1>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    Parceiros comerciais e fabricantes
                </p>
            </div>
            
            <Link 
                href="/fornecedores/novo"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic tracking-tighter text-sm rounded-xl transition-all active:scale-95 border-2 border-blue-500 shadow-lg shadow-blue-900/20"
            >
                + Novo Fornecedor
            </Link>
        </div>

        {/* LISTA */}
        <div className="bg-white rounded-[2rem] border-2 border-zinc-200 shadow-sm overflow-hidden">
            <Listas 
                dados={fornecedores} 
                onAlterarStatus={handlerAlterarStatus} 
                editarHref="fornecedores" 
                mostrarAcoes={true} 
            />
        </div>

    </section>
</main>
    );
}