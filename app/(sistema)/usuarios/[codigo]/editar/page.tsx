'use client'

import { Usuario } from "@/app/context/AuthContext";
import { UsuarioMock } from "@/app/mock/usuario";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import UsuarioForm from "../../components/UsuarioForm";
import axios from "axios";

export default function EditarUsuario(){
    
    const router = useRouter();
    const params = useParams();
    const codigo = Number(params.codigo);

    const [usuario,setUsuario] = useState<Usuario|null>(null);

    useEffect(()=>{
        buscarDados();
    },[]);

    const buscarDados = async ()=>{

        const usuario = await axios.get<Usuario>('http://localhost:8080/usuarios/'+codigo)

        if (usuario) setUsuario(usuario.data)
            else router.push("/usuarios")
    }

    if(!usuario) return(<div className="p-8">Carregando</div>)

    return(
        <div>
            <div>
                <Link href={"/usuarios"}>Voltar</Link>
                <h1>Editar Usuário #{codigo}</h1>
            </div>

            <UsuarioForm usuarioExistente={usuario}></UsuarioForm>
        </div>
    )
}