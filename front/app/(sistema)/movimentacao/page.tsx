'use client'

import Listas from "@/app/components/Lista";
import { buscarListaMovimentacoes, pesquisarMovimentacoes } from "@/app/services/movimentacaoService";
import { Movimentacao } from "@/app/types/movimentacoes";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Movimentacoes() {
    const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
    const [pesquisa, setPesquisa] = useState<string>("");

    useEffect(() => { carregarDados(); }, []);

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
        <main>
            <section>

                <div>
                    <div>
                        <h1>
                            Gestão de <span>Movimentações</span>
                        </h1>
                    </div>

                    <Link href="/movimentacao/novo">
                        + Nova Movimentação
                    </Link>
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="Pesquisar movimentações..." 
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                    <button type="button" onClick={handlePesquisar}>
                        Buscar
                    </button>
                </div>

                <div>
                    <Listas
                        dados={movimentacoes}
                    />
                </div>
            </section>
        </main>
    );
}