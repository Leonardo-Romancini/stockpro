'use client'

import Listas from "@/app/components/Lista";
import { Usuario } from "@/app/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    /*useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await axios.get<Usuario[]>('http://localhost:8080/usuarios');
            if (dados.status !== 200) {
                alert("Erro ao carregar dados!");
            }
            setUsuarios(dados.data);
        } catch (error) {
            console.error(error);
        }
    }*/

    const handlerAlterarStatus = async (usuario: Usuario) => {
        try {
            const novoStatus = usuario.status === "ATIVO" ? { status: "INATIVO" } : { status: "ATIVO" };
            
            const dadosResult = await axios.put<number>(`http://localhost:8080/usuarios/${usuario.id}/AlterarStatus`, novoStatus);
            
            if (dadosResult.status === 200) {
                alert("Usuário salvo com sucesso! Código: " + dadosResult.data);
                /*carregarDados();*/
            }
        } catch (error) {
            alert("Erro ao alterar status do usuário!");
        }
    }

    return (
        <main>
            <section>
                <div>
                    <h1>Gestão de Usuários</h1>
                    <p>Controle de acessos e permissões do sistema</p>
                    
                    <Link href="/usuarios/novo">
                        + Novo Usuário
                    </Link>
                </div>

                <Listas endpoint='http://localhost:8080/usuarios' editarHref="usuarios" mostrarAcoes={true}></Listas>
               { /*<table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>#{usuario.id}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <span>
                                        {usuario.status === 'ATIVO' ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td>
                                    <Link href={`/usuarios/${usuario.id}/editar`}>
                                        Editar
                                    </Link>
                                    
                                    <button onClick={() => handlerAlterarStatus(usuario)}>
                                        {usuario.status === 'ATIVO' ? 'Desativar' : 'Ativar'}
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {usuarios.length === 0 && (
                            <tr>
                                <td colSpan={5}>
                                    Nenhum usuário encontrado no sistema.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>*/}
            </section>
        </main>
    );
}