'use client'


import { registrarUso } from "@/app/redux/slices/historicoSlice";
import { RootState } from "@/app/redux/store";
import { buscarListaFornecedores } from "@/app/services/fornecedorService";
import { editarProduto, salvarProduto } from "@/app/services/produtoService";
import { Fornecedor } from "@/app/types/fornecedores";
import { Produto, ProdutoFormProps } from "@/app/types/produtos";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function ProdutoForm({ produtoExistente }: ProdutoFormProps) {
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const router = useRouter();

    const dispatch = useDispatch();

    const [produto, setProduto] = useState<Produto>(
        produtoExistente || new Produto(null, '', '', 0, 0, 0, null, 'ATIVO', undefined)
    );

    //Captura a lista de IDs do estado global de forma tipada usando 'fornecedorHistorico'
    const recentes = useSelector((state: RootState) => state.fornecedorHistorico.recentes);

    //Filtra os fornecedores com base no array obtido do Redux
    const fornecedoresRecentes = fornecedores.filter(f => recentes.includes(Number(f.id)));
    const outrosFornecedores = fornecedores.filter(f => !recentes.includes(Number(f.id)));


    useEffect(() => {
        carregarFornecedores();
    }, []);

    const carregarFornecedores = async () => {
        try {
            setFornecedores(await buscarListaFornecedores());
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (campo: 'nome' | 'SKU' | 'estoque' | 'preco' | 'estoqueMin' | 'fornecedorId', valor: string) => {
        //Converte string vazia para 0, caso contrário converte para o número
        const valorNumerico = valor === '' ? 0 : Number(valor);

        setProduto(prev =>
            new Produto(
                prev.id,
                campo === 'nome' ? valor : prev.nome,
                campo === 'SKU' ? valor : prev.SKU,
                campo === 'estoque' ? valorNumerico : prev.estoque,
                campo === 'preco' ? valorNumerico : prev.preco,
                campo === 'estoqueMin' ? valorNumerico : prev.estoqueMin,
                campo === 'fornecedorId' ? Number(valor) : prev.fornecedorId,
                prev.status,
                prev.nomeFornecedor
            )
        );
    };

    const handleSalvar = async () => {
        try {
            //Passa os campos do produto para o produtoParaEnviar removendo o nomeFornecedor
            const { nomeFornecedor, ...produtoParaEnviar } = produto;

            if (produtoExistente) {
                await editarProduto(produtoParaEnviar as Produto);
            } else {
                await salvarProduto(produtoParaEnviar as Produto);
            }

            if (produto.fornecedorId) {
                dispatch(registrarUso({ id: Number(produto.fornecedorId) }));
            }
            router.push("/produtos");
        } catch (error) {
            alert("Erro ao salvar o produto.");
        }
    }

    // Estilo comum para os inputs
    const inputStyle = "w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl text-zinc-700 font-bold outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-zinc-300";
    const labelStyle = "text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1";

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <section className="max-w-4xl mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200 overflow-hidden border border-zinc-200">

                    <div className="bg-zinc-950 p-8 md:p-10 border-b border-zinc-800">
                        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                            Dados do <span className="text-blue-500">Produto</span>
                        </h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">
                            Gestão de Inventário e SKU
                        </p>
                    </div>

                    <form action={handleSalvar} className="p-8 md:p-10 space-y-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className={labelStyle}>Nome do Produto</label>
                                <input
                                    type="text"
                                    required
                                    className={inputStyle}
                                    value={produto.nome || ''}
                                    onChange={(e) => handleChange('nome', e.target.value)}
                                    placeholder="Ex: Teclado Mecânico RGB"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className={labelStyle}>SKU (Código de Barras)</label>
                                <input
                                    type="text"
                                    required
                                    className={inputStyle}
                                    value={produto.SKU || ''}
                                    onChange={(e) => handleChange('SKU', e.target.value)}
                                    placeholder="Ex: TEC-12345-BR"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className={labelStyle}>Estoque Atual</label>
                                <input
                                    type="number"
                                    required
                                    className={inputStyle}
                                    // Se for 0, mostra vazio. Se tiver valor, mostra o valor.
                                    value={produto.estoque === 0 ? '' : produto.estoque}
                                    onChange={(e) => handleChange('estoque', e.target.value)}
                                    placeholder="0"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className={labelStyle}>Preço Unitário (R$)</label>
                                <input
                                    type="number"
                                    required
                                    step="0.01"
                                    className={inputStyle}
                                    value={produto.preco === 0 ? '' : produto.preco}
                                    onChange={(e) => handleChange('preco', e.target.value)}
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className={labelStyle}>Estoque Mínimo</label>
                                <input
                                    type="number"
                                    required
                                    className={inputStyle}
                                    value={produto.estoqueMin === 0 ? '' : produto.estoqueMin}
                                    onChange={(e) => handleChange('estoqueMin', e.target.value)}
                                    placeholder="Ex: 5"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className={labelStyle}>Fornecedor Homologado</label>
                            <select
                                name="fornecedor"
                                required
                                className={inputStyle}
                                value={produto.fornecedorId ?? ''}
                                onChange={(e) => handleChange('fornecedorId', e.target.value)}
                            >
                                <option value="">Selecione um fornecedor...</option>

                                {fornecedoresRecentes.length > 0 && (
                                    <optgroup label="Usados Recentemente (Sugestões)">
                                        {fornecedoresRecentes.map((f) => (
                                            <option key={`rec-${f.id}`} value={f.id ?? 0}>
                                                {f.rzsocial}
                                            </option>
                                        ))}
                                    </optgroup>
                                )}

                                <optgroup label="Todos os Fornecedores">
                                    {outrosFornecedores.map((f) => (
                                        <option key={f.id} value={f.id ?? 0}>
                                            {f.rzsocial}
                                        </option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-zinc-100">
                            <Link
                                href="/produtos"
                                className="w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors text-center"
                            >
                                Cancelar
                            </Link>

                            <button
                                type="submit"
                                className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic tracking-tighter text-sm rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95 border-2 border-blue-500"
                            >
                                Salvar Registro
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}