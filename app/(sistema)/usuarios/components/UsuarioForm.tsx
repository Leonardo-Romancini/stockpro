'use client'

import { editarUsuario, salvarUsuario } from "@/app/services/usuarioService";
import { Usuario, UsuarioFormProps } from "@/app/types/usuarios";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {

  const [usuario, setUsuario] = useState<Usuario>(usuarioExistente || new Usuario(null, '', '','','', "ATIVO"))
  const router = useRouter();

  const handleChange = (campo: 'nome' | 'email'| 'senha' | 'cnpj', valor: string) => {
    setUsuario(prev =>
      new Usuario(
        prev.id,
        campo === 'nome' ? valor : prev.nome,
        campo === 'email' ? valor : prev.email,
        campo === 'senha' ? valor : prev.senha,
        campo === 'cnpj' ? valor : prev.cnpj,
        prev.status
      )
    )
  }

  const handleSalvar = async () => {
    try {
      if (usuarioExistente) {
         await editarUsuario(usuario)
      } else {
        await salvarUsuario(usuario)
      }
      router.push("/usuarios")
    } catch (error) {
      alert("Erro ao processar a requisição. Verifique os dados.")
    }
  }

  // Estilos reutilizáveis para manter o padrão StockPro
  const labelStyle = "text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1";
  const inputStyle = "w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl text-zinc-700 font-bold outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-zinc-300 shadow-sm";

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      
      <section className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200 overflow-hidden border border-zinc-200">


          <div className="bg-zinc-950 p-8 md:p-10 border-b border-zinc-800">
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
              Dados do <span className="text-blue-500">Usuário</span>
            </h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">
              Controle de Acessos e Credenciais
            </p>
          </div>

          <form action={handleSalvar} className="p-8 md:p-10 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="space-y-2">
                <label className={labelStyle}>Nome completo</label>
                <input
                  type="text"
                  required
                  value={usuario.nome || ''}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="Ex: João da Silva"
                  className={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <label className={labelStyle}>Endereço de E-mail</label>
                <input
                  type="email"
                  required
                  value={usuario.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="usuario@stockpro.com"
                  className={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <label className={labelStyle}>Senha de Acesso</label>
                <input
                  type="password"
                  required
                  value={usuario.senha || ''}
                  onChange={(e) => handleChange('senha', e.target.value)}
                  placeholder="••••••••"
                  className={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <label className={labelStyle}>Documento (CNPJ/CPF)</label>
                <input
                  type="text"
                  required
                  value={usuario.cnpj || ''}
                  onChange={(e) => handleChange('cnpj', e.target.value)}
                  placeholder="00.000.000/0000-00"
                  className={inputStyle}
                />
              </div>
            </div>

            {/* DIVISOR DE AÇÕES */}
            <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-end gap-4">
              <Link
                href="/usuarios"
                className="w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors text-center"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="w-full sm:w-auto px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase italic tracking-tighter text-sm rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95 border-2 border-blue-500"
              >
                Salvar Registro
              </button>
            </div>
          </form>

        </div>

        {/* FOOTER DE SEGURANÇA */}
        <div className="mt-8 flex items-center justify-center gap-3 text-zinc-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                Ambiente de Autenticação Seguro
            </span>
        </div>
      </section>
    </div>
  )
}