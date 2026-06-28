'use client'

import Listas from "@/app/components/Lista";
import { alterarStatusUsuario, buscarListaUsuarios } from "@/app/services/usuarioService";
import { Usuario } from "@/app/types/usuarios";
import axios from "axios";


import Link from "next/link";
import { useEffect, useState } from "react";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => { carregarDados(); }, []);

    const carregarDados = async () => {
        try {
            const dados = await buscarListaUsuarios();
            setUsuarios(dados);
        } catch (error) { 
            alert("Erro ao carregar os dados!")
            console.error(error); 
        }
    }

    const handlerAlterarStatus = async (usuario: Usuario) => {
        try {
            await alterarStatusUsuario(usuario)
            carregarDados();

            alert("Usuário salvo com sucesso! Código: " + usuario.id)
        } catch (error) { alert("Erro ao alterar status!"); }
    }

    return (
        <main className="min-h-screen flex flex-col font-sans antialiased bg-zinc-50">
            <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-8">
                
                <div className="w-full bg-zinc-950 rounded-[2rem] p-8 md:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                            Gestão de <span className="text-blue-500">Usuários</span>
                        </h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Acessos e Permissões</p>
                    </div>
                    
                    <Link 
                        href="/usuarios/novo"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase italic tracking-tighter text-sm rounded-xl shadow-lg border-2 border-blue-400/30 transition-all"
                    >
                        + Novo Usuário
                    </Link>
                </div>

                <div className="bg-white rounded-[2rem] border-2 border-zinc-200 shadow-sm overflow-hidden">
                    <Listas 
                        dados={usuarios} 
                        onAlterarStatus={handlerAlterarStatus} 
                        editarHref="usuarios" 
                        mostrarAcoes={true} 
                    />
                </div>
            </section>
        </main>
    );
}