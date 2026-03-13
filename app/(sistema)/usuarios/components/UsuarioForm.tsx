'use client'

import { Usuario } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function UsuarioForm(){

const [usuario,setUsuario] = useState<Usuario>(new Usuario(0,'','',true))

const handleChange = (campo: 'nome' | 'cpf', valor: string)=>{
    setUsuario(prev=>
        new Usuario(
            prev.codigo,
            campo === 'nome'? valor: prev.name,
            campo === 'cpf'? valor: prev.CPF,
            prev.ativo
        )
    )
}

const handleSalvar = (formData : FormData) =>{

}

    return(
        <form action={handleSalvar}>
            <div>
                <div>
                    <label htmlFor="">Nome completo</label>
                    <input type="text" required value={usuario.name} onChange={(e)=>handleChange('nome',e.target.value)} placeholder="João da Silva Sauro"></input>
                </div>
                <div>
                    <label htmlFor="">CPF</label>
                    <input type="text" required value={usuario.CPF} onChange={(e)=>handleChange('cpf',e.target.value)} placeholder="40028922"></input>
                </div>
                <div>
                    <Link href="/usuarios">Cancelar</Link>
                    <button type="submit">Salvar</button>
                </div>
            </div>
        </form>
    )
}