'use client'

import { useEffect, useState } from "react";
import Listas from "@/app/components/Lista";
import DashboardCard from "@/app/components/DashboardCard";
import { buscarEstatisticasFornecedor } from "@/app/services/fornecedorService";
import { buscarEstatisticasMovimentacao } from "@/app/services/movimentacaoService";
import { buscarEstatisticasProduto, buscarListaProdutosEstoqueCritico } from "@/app/services/produtoService";
import { Produto } from "@/app/types/produtos";

export default function Home() {
    const [estatisticas, setEstatisticas] = useState({
        movimentacoes: { totalEntradas: 0, totalSaidas: 0 },
        fornecedores: { total: 0 },
        produtos: { totalProdutos: 0, totalProdutosCriticos: 0 }
    });
    const [produtosCriticos, setProdutosCriticos] = useState<Produto[]>([]);

    useEffect(() => {
        carregarDashboard();
    }, []);

    const carregarDashboard = async () => {
        try {
            const [statsMov, statsFornecedores, statsProdutos, listaCriticos] = await Promise.all([
                buscarEstatisticasMovimentacao(),
                buscarEstatisticasFornecedor(),
                buscarEstatisticasProduto(),
                buscarListaProdutosEstoqueCritico()
            ]);

            setEstatisticas({
                movimentacoes: statsMov || { totalEntradas: 0, totalSaidas: 0 },
                fornecedores: statsFornecedores || { total: 0 },
                produtos: statsProdutos || { totalProdutos: 0, totalProdutosCriticos: 0 }
            });
            setProdutosCriticos(listaCriticos || []);
        } catch (error) {
            console.error("Erro ao carregar dados do dashboard", error);
        }
    };

    return (
        <main className="p-8 bg-zinc-50 min-h-screen space-y-12">
            
            {/* GRUPO 1: VISÃO GERAL */}
            <section>
                <h2 className="text-lg font-black text-zinc-900 mb-6 uppercase italic tracking-tighter">Visão Geral</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DashboardCard titulo="Total Movimentações" valor={estatisticas.movimentacoes.totalEntradas + estatisticas.movimentacoes.totalSaidas} cor="text-blue-600" />
                    <DashboardCard titulo="Fornecedores" valor={estatisticas.fornecedores.total} cor="text-zinc-900" />
                    <DashboardCard titulo="Total Produtos" valor={estatisticas.produtos.totalProdutos} cor="text-zinc-900" />
                </div>
            </section>

            {/* GRUPO 2: OPERACIONAL */}
            <section>
                <h2 className="text-lg font-black text-zinc-900 mb-6 uppercase italic tracking-tighter">Dados Operacionais</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DashboardCard titulo="Total Entradas" valor={estatisticas.movimentacoes.totalEntradas} cor="text-emerald-600" />
                    <DashboardCard titulo="Total Saídas" valor={estatisticas.movimentacoes.totalSaidas} cor="text-red-600" />
                    <DashboardCard titulo="Estoque Crítico" valor={estatisticas.produtos.totalProdutosCriticos} cor="text-orange-500" />
                </div>
            </section>

            {/* LISTA DE CRÍTICOS */}
            <section>
                <h2 className="text-lg font-black text-zinc-900 mb-6 uppercase italic tracking-tighter">Produtos em Estoque Crítico</h2>
                <div className="bg-white rounded-[2rem] border-2 border-zinc-200 shadow-sm overflow-hidden">
                    <Listas dados={produtosCriticos} />
                </div>
            </section>
        </main>
    );
}