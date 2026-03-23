import { Fornecedor } from "@/app/mock/fornecedor";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface FornecedorFormProps {
    fornecedorExistente?: Fornecedor
}

export default function FornececdorForm({ fornecedorExistente }: FornecedorFormProps) {

    const [fornecedor, setFornecedor] = useState<Fornecedor>(fornecedorExistente || new Fornecedor(null, '', '', '', '', "ATIVO"))
    const router = useRouter();


    {/* aplicar o Numer() ou parecidos para converter o tipo do valor*/ }
    const handleChange = (campo: 'rzsocial' | 'nomef' | 'CNPJ' | 'email', valor: string) => {
        setFornecedor(prev =>
            new Fornecedor(
                prev.id,
                campo === 'rzsocial' ? valor : prev.rzsocial,
                campo === 'nomef' ? valor : prev.nomef,
                campo === 'CNPJ' ? valor : prev.CNPJ,
                campo === 'email' ? valor : prev.email,
                prev.status
            )
        )
    }

    const handleSalvar = async (formData: FormData) => {

        var dadosResult = await axios.post<number>('http://localhost:8080/fornecedores', fornecedor)
        if (dadosResult.status !== 200) {
            alert("Fornecedor salvo com sucesso! Código: " + dadosResult.data)
        }

        router.push("/fornecedores")

    }

    return (
        <div>
            {/* CONTAINER DO FORMULÁRIO */}
            <section>
                <div>
                    {/* TOPO DO CARD */}
                    <div>
                        <h1>
                            Dados do <span>Usuário</span>
                        </h1>
                        <p>Preencha as informações abaixo</p>
                    </div>

                    <form action={handleSalvar}>
                        {/* GRUPO DE CAMPOS */}
                        <div>
                            {/* CAMPO: RAZÃO SOCIAL */}
                            <div>
                                <label>Razão Social</label>
                                <input
                                    type="text"
                                    required
                                    value={fornecedor.rzsocial}
                                    onChange={(e) => handleChange('rzsocial', e.target.value)}
                                    placeholder="Insira a razão social"
                                />
                            </div>

                            {/* CAMPO: EMAIL */}
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    required
                                    value={fornecedor.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="Insira o email aqui"
                                />
                            </div>

                            {/* CAMPO: CNPJ */}
                            <div>
                                <label>CNPJ</label>
                                <input
                                    type="text"
                                    required
                                    value={fornecedor.CNPJ}
                                    onChange={(e) => handleChange('CNPJ', e.target.value)}
                                    placeholder="Insira o CNPJ aqui"
                                />
                            </div>

                            {/* CAMPO: NOME FANTASIA */}
                            <div>
                                <label>Nome Fantasia</label>
                                <input
                                    type="text"
                                    required
                                    value={fornecedor.nomef} // Corrigido de .email para .nomef
                                    onChange={(e) => handleChange('nomef', e.target.value)}
                                    placeholder="Insira o nome fantasia aqui"
                                />
                            </div>
                        </div>

                        {/* DIVISOR DE AÇÕES - Agora dentro do <form> */}
                        <div>
                            <Link href="/fornecedores">
                                Cancelar
                            </Link>

                            <button type="submit">
                                Salvar Registro
                            </button>
                        </div>
                    </form>
                    {/* FIM DO FORMULÁRIO */}

                </div>
            </section>
        </div>
    );

}