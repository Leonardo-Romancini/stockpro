'use client'

import { Usuario } from "@/app/context/AuthContext";
import { UsuarioMock } from "@/app/mock/usuario";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UsuarioFormProps {
  usuarioExistente?: Usuario
}

export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {

  const [usuario, setUsuario] = useState<Usuario>(usuarioExistente || new Usuario(null, '', '', "ATIVO"))
  const router = useRouter();


  {/* aplicar o Numer() ou parecidos para converter o tipo do valor*/}
  const handleChange = (campo: 'nome' | 'email', valor: string) => {
    setUsuario(prev =>
      new Usuario(
        prev.id,
        campo === 'nome' ? valor : prev.nome,
        campo === 'email' ? valor : prev.email,
        prev.status
      )
    )
  }

  const handleSalvar = async (formData: FormData) => {

     var dadosResult = await axios.post<number>('http://localhost:8080/usuarios',usuario)
     if (dadosResult.status!==200){
        alert("Usuário salvo com sucesso! Código: " + dadosResult.data)
     }

    router.push("/usuarios")

  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative font-sans antialiased bg-gradient-to-br from-zinc-100 via-blue-100 to-blue-400/50">

      {/* Esferas de reforço visual para manter a identidade StockPro */}
      <div className="fixed -bottom-40 -right-20 w-[600px] h-[600px] bg-blue-500/30 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="fixed -top-20 -left-20 w-[400px] h-[400px] bg-indigo-400/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* CONTAINER DO FORMULÁRIO */}
      <section className="flex-1 flex items-center justify-center px-6 pt-10 pb-20">
        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-[2.5rem] border-4 border-white shadow-2xl shadow-blue-900/10 overflow-hidden">

          {/* TOPO DO CARD */}
          <div className="bg-zinc-950 p-8 border-b border-zinc-800">
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
              Dados do <span className="text-blue-500">Usuário</span>
            </h1>
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Preencha as informações abaixo</p>
          </div>

          <form action={handleSalvar} className="p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* CAMPO: NOME */}
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-700 uppercase tracking-widest ml-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  value={usuario.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="João da Silva Sauro"
                  className="w-full px-5 py-4 rounded-xl border-2 border-zinc-100 bg-white/50 focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-zinc-900 placeholder:text-zinc-300 shadow-sm"
                />
              </div>

              {/* CAMPO: CPF */}
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-700 uppercase tracking-widest ml-1">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={usuario.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-5 py-4 rounded-xl border-2 border-zinc-100 bg-white/50 focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-zinc-900 placeholder:text-zinc-300 shadow-sm"
                />
              </div>
            </div>

            {/* DIVISOR DE AÇÕES */}
            <div className="pt-6 border-t border-zinc-200/50 flex flex-col sm:flex-row items-center justify-end gap-4">
              <Link
                href="/usuarios"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-zinc-200 text-zinc-500 font-black uppercase italic tracking-tighter text-sm hover:bg-zinc-50 hover:text-zinc-700 transition-all text-center"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="w-full sm:w-auto px-12 py-4 bg-zinc-950 hover:bg-zinc-800 text-white font-black uppercase italic tracking-tighter text-sm rounded-xl shadow-xl shadow-zinc-950/20 transition-all active:scale-95 border-2 border-zinc-950"
              >
                Salvar Registro
              </button>
            </div>
          </form>

        </div>
      </section>
    </div>
  )
}