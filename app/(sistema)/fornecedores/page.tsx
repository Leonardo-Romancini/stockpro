import FormFornece from "@/app/components/FormFornece";
import { Fornecedor, FornecedorMock } from "@/app/mock/fornecedor";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Fornecedores() {

    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

    useEffect(() => {
            carregarDados();
        }, []);
    

    const carregarDados = async () => {
            try {
                const dados = await FornecedorMock.listarTodos();
                setFornecedores(dados);
            } catch (error) {
                console.error(error);
            }
        }

        const handlerAlterarStatus = async (fornecedor: Fornecedor) => {
                try {
                    setFornecedores(fornecedoresAtuais => fornecedoresAtuais.map(f => 
                        f.codigo === fornecedor.codigo ? new Fornecedor(f.codigo,f.rzsocial, f.nomef, f.CNPJ, f.email, !f.ativo) : f
                    ));
                } catch (error) {
                    alert("Erro ao alterar status do fornecedor!");
                }
            }

    return(
        <main>
            <section>
                <div>
                    <h1>Gestão de Fornecedores</h1>
                    
                    <Link href="/fornecedores/novo">
                        + Novo Fornecedor
                    </Link>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>RzSocial</th>
                            <th>NomeF</th>
                            <th>CNPJ</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fornecedores.map((fornecedor) => (
                            <tr key={fornecedor.codigo}>
                                <td>#{fornecedor.codigo}</td>
                                <td>{fornecedor.rzsocial}</td>
                                <td>{fornecedor.nomef}</td>
                                <td>{fornecedor.CNPJ}</td>
                                <td>{fornecedor.email}</td>
                                <td>
                                    <span>
                                        {fornecedor.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td>
                                    <div>
                                        <Link href={`/fornecedores/${fornecedor.codigo}/editar`}>
                                            Editar
                                        </Link>
                                        <button onClick={() => handlerAlterarStatus(fornecedor)}>
                                            {fornecedor.ativo ? 'Desativar' : 'Ativar'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        
                        {fornecedores.length === 0 && (
                            <tr>
                                <td colSpan={5}>
                                    Nenhum fornecedor encontrado no sistema.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </main>
    );
}