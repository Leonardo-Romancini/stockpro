'use client'

import Listas from "@/app/components/Lista";
import { Produto } from "@/app/types/produtos";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await axios.get<Produto[]>('http://localhost:8080/produtos');
            if (dados.status !== 200) {
                alert("Erro ao carregar dados!");
            }
            setProdutos(dados.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handlerAlterarStatus = async (produto: Produto) => {
        try {
            const novoStatus = produto.status === "ATIVO" ? { status: "INATIVO" } : { status: "ATIVO" };
            const dadosResult = await axios.put<string>(`http://localhost:8080/produtos/${produto.id}/AlterarStatus`, novoStatus);
            
            if (dadosResult.status === 200) {
                carregarDados();
                alert(dadosResult.data);
            }
        } catch (error) {
            alert("Erro ao alterar status do produto!");
        }
    }

    return (
        <main className="min-h-screen flex flex-col font-sans antialiased bg-zinc-50">
            <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-8">
                

                <div className="w-full bg-zinc-950 rounded-[2rem] p-8 md:p-10 border-b border-zinc-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                            Gestão de <span className="text-blue-500">Produtos</span>
                        </h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                            Controle de inventário e catálogo
                        </p>
                    </div>
                    
                    <Link 
                        href="/produtos/novo"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic tracking-tighter text-sm rounded-xl transition-all active:scale-95 border-2 border-blue-500 shadow-lg shadow-blue-900/20"
                    >
                        + Novo Produto
                    </Link>
                </div>


                <div className="bg-white rounded-[2rem] border-2 border-zinc-200 shadow-sm overflow-hidden">
                    <Listas 
                        dados={produtos} 
                        onAlterarStatus={handlerAlterarStatus} 
                        editarHref="produtos" 
                        mostrarAcoes={true} 
                    />
                </div>

            </section>
        </main>
    );
}