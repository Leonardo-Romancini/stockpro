import Link from "next/link";
import FornececdorForm from "../components/FornecedorForm";

export default function cadastrarFornecedor(){
    return(
        <div>
            <div>
                <Link href={"fornecedores"}>Voltar</Link>
                <h1>Cadastro de Novo Fornecedor</h1>
            </div>

            <FornececdorForm/>
        </div>
    );
}