'use client'

import Listas from "@/app/components/Lista";
import { buscarListaMovimentacoes, pesquisarMovimentacoes } from "@/app/services/movimentacaoService";
import { Movimentacao } from "@/app/types/movimentacoes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';


export default function Movimentacoes() {
    const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
    const [pesquisa, setPesquisa] = useState<string>("");

    useEffect(() => { carregarDados(); }, []);

    const dadosFormatados = movimentacoes.map(m => ({
        ...m,
        //Formatação da data
        data: m.data ? format(parseISO(m.data), 'dd/MM/yyyy HH:mm:ss') : "N/A"
    }));


    const carregarDados = async () => {
        try {
            const dados = await buscarListaMovimentacoes();
            setMovimentacoes(dados);
        } catch (error) {
            alert("Erro ao carregar os dados!");
            console.error(error);
        }
    }

    const handlePesquisar = async () => {
        try {
            // Se a barra estiver vazia, recarrega a lista completa, senão busca o termo
            if (pesquisa.trim() === "") {
                await carregarDados();
            } else {
                const dadosFiltrados = await pesquisarMovimentacoes(pesquisa);
                setMovimentacoes(dadosFiltrados);
            }
        } catch (error) {
            alert("Erro ao realizar a pesquisa!");
            console.error(error);
        }
    };

    return (
        <main className="min-h-screen flex flex-col font-sans antialiased bg-zinc-50">
            <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-8">

                {/* HEADER */}
                <div className="w-full bg-zinc-950 rounded-[2rem] p-8 md:p-10 border-b border-zinc-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                            Gestão de <span className="text-blue-500">Movimentações</span>
                        </h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                            Entradas e saídas de estoque
                        </p>
                    </div>

                    <Link
                        href="/movimentacao/novo"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic tracking-tighter text-sm rounded-xl transition-all active:scale-95 border-2 border-blue-500 shadow-lg shadow-blue-900/20"
                    >
                        + Nova Movimentação
                    </Link>
                </div>

                {/* PESQUISA */}
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Pesquisar por produto..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                        className="flex-1 px-6 py-4 rounded-2xl border-2 border-zinc-200 focus:border-blue-500 outline-none transition-all font-bold text-zinc-700"
                    />
                    <button
                        type="button"
                        onClick={handlePesquisar}
                        className="px-8 py-4 bg-zinc-900 hover:bg-black text-white font-black uppercase italic tracking-tighter rounded-2xl transition-all active:scale-95"
                    >
                        Buscar
                    </button>
                </div>

                {/* LISTA */}
                <div className="bg-white rounded-[2rem] border-2 border-zinc-200 shadow-sm overflow-hidden">
                    <Listas
                        dados={dadosFormatados}
                    />
                </div>

            </section>
        </main>
    );
}