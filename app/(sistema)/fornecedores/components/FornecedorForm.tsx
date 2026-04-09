'use client'

import { Fornecedor } from "@/app/mock/fornecedor";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FornecedorFormProps {
    fornecedorExistente?: Fornecedor
}

export default function FornecedorForm({ fornecedorExistente }: FornecedorFormProps) {
    const [fornecedor, setFornecedor] = useState<Fornecedor>(fornecedorExistente || new Fornecedor(null, '', '', '', '', "ATIVO"))
    const router = useRouter();

    const handleChange = (campo: 'rzsocial' | 'nomef' | 'cnpj' | 'email', valor: string) => {
        setFornecedor(prev =>
            new Fornecedor(
                prev.id,
                campo === 'rzsocial' ? valor : prev.rzsocial,
                campo === 'nomef' ? valor : prev.nomef,
                campo === 'cnpj' ? valor : prev.cnpj,
                campo === 'email' ? valor : prev.email,
                prev.status
            )
        )
    }

    const handleSalvar = async () => {
        try {
            const dadosResult = await axios.post<number>('http://localhost:8080/fornecedores', fornecedor)
            if (dadosResult.status === 200 || dadosResult.status === 201) {
                alert("Fornecedor salvo com sucesso! Código: " + dadosResult.data)
                router.push("/fornecedores")
            }
        } catch (error) {
            alert("Erro ao salvar fornecedor. Verifique os dados.")
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
            <section className="max-w-4xl mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200 overflow-hidden border border-zinc-200">
                    
                    <div className="bg-zinc-950 p-8 md:p-10 border-b border-zinc-800">
                        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                            Dados do <span className="text-blue-500">Fornecedor</span>
                        </h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">
                            Preencha as informações cadastrais abaixo
                        </p>
                    </div>

                    <form action={handleSalvar} className="p-8 md:p-10 space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">
                                    Razão Social
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl text-zinc-700 font-bold outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-zinc-300"
                                    value={fornecedor.rzsocial || ''}
                                    onChange={(e) => handleChange('rzsocial', e.target.value)}
                                    placeholder="Ex: Alimentos S.A."
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">
                                    Nome Fantasia
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl text-zinc-700 font-bold outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-zinc-300"
                                    value={fornecedor.nomef || ''}
                                    onChange={(e) => handleChange('nomef', e.target.value)}
                                    placeholder="Ex: Distribuidora Norte"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">
                                    CNPJ
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl text-zinc-700 font-bold outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-zinc-300"
                                    value={fornecedor.cnpj || ''}
                                    onChange={(e) => handleChange('cnpj', e.target.value)}
                                    placeholder="00.000.000/0000-00"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">
                                    Email de Contato
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl text-zinc-700 font-bold outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-zinc-300"
                                    value={fornecedor.email || ''}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="contato@fornecedor.com"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-zinc-100">
                            <Link 
                                href="/fornecedores"
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

                <div className="mt-6 flex items-center justify-center gap-2 text-zinc-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Criptografia de ponta a ponta StockPro</span>
                </div>
            </section>
        </div>
    );
}