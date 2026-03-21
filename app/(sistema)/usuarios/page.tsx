'use client'

import { Usuario } from "@/app/context/AuthContext";
import { UsuarioMock } from "@/app/mock/usuario";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await axios.get<Usuario[]>('http://localhost:8080/usuarios');

            if(dados.status!==200){
                alert("Erro ao carregar dados!")
            }

            setUsuarios(dados.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handlerAlterarStatus = async (usuario: Usuario) => {
        try {
            setUsuarios(usuariosAtuais => usuariosAtuais.map(u => 
                u.id === usuario.id ? new Usuario(u.id, u.nome, u.email, u.status) : u
            ));
        } catch (error) {
            alert("Erro ao alterar status do usuário!");
        }
    }

    return (
        <main className="min-h-screen flex flex-col overflow-x-hidden relative font-sans antialiased bg-gradient-to-br from-zinc-100 via-blue-100 to-blue-400/50">
            
            {/* Esferas de reforço visual para manter a profundidade do padrão StockPro */}
            <div className="fixed -bottom-40 -right-20 w-[600px] h-[600px] bg-blue-500/30 blur-[130px] rounded-full pointer-events-none -z-10" />
            <div className="fixed -top-20 -left-20 w-[400px] h-[400px] bg-indigo-400/20 blur-[100px] rounded-full pointer-events-none -z-10" />

            {/* CONTEÚDO PRINCIPAL - pt-10 pois o Header já vem de outro componente */}
            <section className="flex-1 pt-10 pb-20 px-6 max-w-7xl mx-auto w-full space-y-8">
                
                {/* TÍTULO E AÇÕES RAPIDAS */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-blue-600 pl-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight italic uppercase">
                            Gestão de <span className="text-blue-600">Usuários</span>
                        </h1>
                        <p className="text-zinc-600 font-medium italic">Controle de acessos e permissões do sistema</p>
                    </div>
                    
                    <Link 
                        href="/usuarios/novo" 
                        className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-zinc-950 text-white font-black uppercase italic tracking-tighter hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-950/20 active:scale-95 text-sm"
                    >
                        + Novo Usuário
                    </Link>
                </div>

                {/* TABELA GLASSMORPHISM (Estilo Vidro) */}
                <div className="overflow-hidden rounded-[2.5rem] border-4 border-white bg-white/70 backdrop-blur-xl shadow-2xl shadow-blue-900/10">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-zinc-950 text-white font-black italic uppercase text-[10px] tracking-[0.2em]">
                            <tr>
                                <th className="px-6 py-5">Código</th>
                                <th className="px-6 py-5">Nome</th>
                                <th className="px-6 py-5">CPF</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200/50">
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id} className="hover:bg-white/50 transition-colors">
                                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">#{usuario.id}</td>
                                    <td className="px-6 py-4 text-zinc-900 font-bold text-sm uppercase italic tracking-tight">{usuario.nome}</td>
                                    <td className="px-6 py-4 text-zinc-600 text-sm font-medium">{usuario.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase italic border ${
                                            usuario.status 
                                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                                            : 'bg-zinc-200 text-zinc-600 border-zinc-300'
                                        }`}>
                                            {usuario.status ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <Link 
                                                href={`/usuarios/${usuario.id}/editar`}
                                                className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                                                title="Editar Usuário"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                            </Link>
                                            <button 
                                                onClick={() => handlerAlterarStatus(usuario)}
                                                className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-tighter transition-all ${
                                                    usuario.status 
                                                    ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white' 
                                                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                                                }`}
                                            >
                                                {usuario.status ? 'Desativar' : 'Ativar'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            
                            {usuarios.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <p className="text-zinc-400 font-bold uppercase italic tracking-widest">Nenhum usuário encontrado no sistema.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}