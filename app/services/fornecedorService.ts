import { Fornecedor } from "../types/fornecedores";
import api from "./api";


export async function buscarListaFornecedores(): Promise<Fornecedor[]> {
    const dados = await api.get<Fornecedor[]>('/fornecedores');

            if (dados.status == 200){
                return dados.data
            } 
        
    return[]
}

export async function alterarStatusFornecedor(fornecedor: Fornecedor): Promise<void> {
    
    var novoStatus = {};
    if (fornecedor.status === "ATIVO"){
        novoStatus = {status: "INATIVO"};
    } else {
        novoStatus = {status: "ATIVO"}
    }

    const dadosResult = await api.put<string>('/fornecedores/'+fornecedor.id+'/AlterarStatus', novoStatus);
    
    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar Status!")
    }
}

export async function fornecedorPorId(id: number){
    const response = await api.get<Fornecedor>('/fornecedores/' + id)
            return response.data;
}

export async function salvarFornecedor(fornecedor: Fornecedor): Promise<void> {
    var dadosResult = await api.post<number>('/fornecedores', fornecedor)
        if (dadosResult.status === 200 || dadosResult.status === 201) {
          alert("Fornecedor salvo com sucesso! Código: " + dadosResult.data)
        } 
}


export async function editarFornecedor(fornecedor: Fornecedor) {
    var dadosResult = await api.put<number>('/fornecedores/' + fornecedor.id, fornecedor)
        if (dadosResult.status === 200) {
          alert("Fornecedor atualizado com sucesso!")
        }
}