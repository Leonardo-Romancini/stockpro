'use client'


import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import UsuarioForm from "../../components/UsuarioForm";
import axios from "axios";
import { Usuario } from "@/app/types/usuarios";
import { usuarioPorId } from "@/app/services/usuarioService";

export default function EditarUsuario() {
    
    const router = useRouter();
    const params = useParams();
    const codigo = Number(params.codigo);

    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        buscarDados();
    }, []);

    const buscarDados = async () => {
        try {
            if (await usuarioPorId(codigo)) {
                setUsuario(await usuarioPorId(codigo))
            } else {
                router.push("/usuarios")
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            router.push("/usuarios");
        }
    }

    // TELA DE CARREGAMENTO PADRONIZADA STOCKPRO
    if (!usuario) {
        return (
            <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-sans">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-zinc-200 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">Sincronizando Usuário...</p>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-zinc-50 font-sans antialiased">

            <nav className="w-full max-w-4xl mx-auto px-4 pt-12">
                <Link 
                    href="/usuarios" 
                    className="group inline-flex items-center gap-2 text-zinc-400 hover:text-blue-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest">Voltar para controle de acessos</span>
                </Link>
            </nav>

            <section className="pb-20">

                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-6">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-black text-zinc-900 uppercase italic tracking-tighter">
                                Ajustar <span className="text-blue-600">Credenciais</span>
                            </h1>
                            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                                Edição de perfil e permissões de sistema
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-tighter">Registro Interno</span>
                            <span className="text-xl font-black text-zinc-900 tracking-tighter">ID #{codigo}</span>
                        </div>
                    </div>
                </div>


                <UsuarioForm usuarioExistente={usuario} />
                

                <div className="max-w-4xl mx-auto px-4 mt-8 flex items-center gap-4 p-4 bg-zinc-100 rounded-2xl border border-zinc-200">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase leading-relaxed">
                        Nota: Alterações de senha e e-mail podem exigir uma nova autenticação por parte do usuário na próxima sessão.
                    </p>
                </div>
            </section>
        </main>
    )
}