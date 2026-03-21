import { Fornecedor, FornecedorMock } from "@/app/mock/fornecedor";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";


export default function EditarFornecedor(){

    const router = useRouter();
    const params = useParams();
    const  codigo = Number(params.codigo)

    const [fornecedor,setFornecedor] = useState<Fornecedor|null>(null);
    
        useEffect(()=>{
            buscarDados();
        },[]);
    
        const buscarDados = async ()=>{
    
            const fornecedor = await FornecedorMock.buscarPorId(codigo)
    
            if (fornecedor) setFornecedor(fornecedor)
                else router.push("/fornecedores")
        }
    
        if(!fornecedor) return(<div className="p-8">Carregando</div>)
    

    return(
        <div>
            <div>
                <Link href={"/fornecedores"}>Voltar</Link>
                <h1>Editar Usuário #{codigo}</h1>
            </div>

        </div>
    )
}