'use client'

import { registrarUso } from "@/app/redux/slices/historicoSlice";
import { RootState } from "@/app/redux/store";
import { buscarListaProdutos } from "@/app/services/produtoService";
import { salvarMovimentacao } from "@/app/services/movimentacaoService";
import { Produto } from "@/app/types/produtos";
import { Movimentacao } from "@/app/types/movimentacoes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MovimentacaoForm() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const router = useRouter();
    const dispatch = useDispatch();

    // Estado inicial focado apenas em um novo registro (data tratada no back-end)
    const [movimentacao, setMovimentacao] = useState<Movimentacao>(
        new Movimentacao(null, 'ENTRADA', 0, null, null, undefined)
    );

    // Captura os produtos recentes do Redux para sugestão
    const recentes = useSelector((state: RootState) => state.produtoHistorico?.recentes || []);

    const produtosRecentes = produtos.filter(p => recentes.includes(Number(p.id)));
    const outrosProdutos = produtos.filter(p => !recentes.includes(Number(p.id)));

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        try {
            setProdutos(await buscarListaProdutos());
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }

    const handleChange = (campo: 'tipo' | 'quantidade' | 'produtoId', valor: string) => {
        //Converte para 0 caso o valor seja vazio para não dar problema
        const valorNumerico = valor === '' ? 0 : Number(valor);

        setMovimentacao(prev =>
            new Movimentacao(
                prev.id,
                campo === 'tipo' ? valor : prev.tipo,
                campo === 'quantidade' ? valorNumerico : prev.quantidade,
                prev.data,
                campo === 'produtoId' ? Number(valor) : prev.produtoId,
                prev.nomeProduto
            )
        );
    };

    const handleSalvar = async () => {
        try {
            const { nomeProduto, ...movimentacaoParaEnviar } = movimentacao;

            await salvarMovimentacao(movimentacaoParaEnviar as Movimentacao);

            if (movimentacao.produtoId) {
                dispatch(registrarUso({ id: Number(movimentacao.produtoId) }));
            }
            router.push("/movimentacao");
        } catch (error) {
            alert("Erro ao salvar a movimentação.");
        }
    }

    const inputStyle = "w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl text-zinc-700 font-bold outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-zinc-300";
    const labelStyle = "text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1";

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <section className="max-w-4xl mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200 overflow-hidden border border-zinc-200">

                    <div className="bg-zinc-950 p-8 md:p-10 border-b border-zinc-800">
                        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                            Nova <span className="text-blue-500">Movimentação</span>
                        </h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">
                            Lançamento de fluxo de estoque
                        </p>
                    </div>

                    <form action={handleSalvar} className="p-8 md:p-10 space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className={labelStyle}>Tipo de Fluxo</label>
                                <select
                                    required
                                    className={inputStyle}
                                    value={movimentacao.tipo || 'ENTRADA'}
                                    onChange={(e) => handleChange('tipo', e.target.value)}
                                >
                                    <option value="ENTRADA">🟢 ENTRADA (Aporte de Estoque)</option>
                                    <option value="SAIDA">🔴 SAÍDA (Venda / Baixa / Consumo)</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className={labelStyle}>Quantidade</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    className={inputStyle}
                                    // Se for 0, mostra vazio. Se tiver valor (ex: 50), mostra o número.
                                    value={movimentacao.quantidade === 0 ? '' : movimentacao.quantidade}
                                    onChange={(e) => handleChange('quantidade', e.target.value)}
                                    placeholder="Ex: 50"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className={labelStyle}>Produto Vinculado</label>
                            <select
                                name="produto"
                                required
                                className={inputStyle}
                                value={movimentacao.produtoId ?? ''}
                                onChange={(e) => handleChange('produtoId', e.target.value)}
                            >
                                <option value="">Selecione um produto do estoque...</option>

                                {produtosRecentes.length > 0 && (
                                    <optgroup label="Movimentados Recentemente (Sugestões)">
                                        {produtosRecentes.map((p) => (
                                            <option key={`rec-${p.id}`} value={p.id ?? 0}>
                                                {p.nome} — (SKU: {p.SKU})
                                            </option>
                                        ))}
                                    </optgroup>
                                )}

                                <optgroup label="Todos os Produtos Cadastrados">
                                    {outrosProdutos.map((p) => (
                                        <option key={p.id} value={p.id ?? 0}>
                                            {p.nome} — (SKU: {p.SKU})
                                        </option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-zinc-100">
                            <Link
                                href="/movimentacao"
                                className="w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors text-center"
                            >
                                Cancelar
                            </Link>

                            <button
                                type="submit"
                                className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic tracking-tighter text-sm rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95 border-2 border-blue-500"
                            >
                                Confirmar Lançamento
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}