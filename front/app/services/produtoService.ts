import { Produto } from "../types/produtos";
import api from "./api";


export async function buscarListaProdutos(): Promise<Produto[]> {
    const dados = await api.get<Produto[]>('/produtos');

            if (dados.status == 200){
                return dados.data
            } 
        
    return[]
}

export async function alterarStatusProdutos(produto: Produto): Promise<void> {
    var novoStatus = {};
    if (produto.status === "ATIVO"){
        novoStatus = {status: "INATIVO"};
    } else {
        novoStatus = {status: "ATIVO"}
    }
    const dadosResult = await api.put<string>('/produtos/'+produto.id+'/AlterarStatus', novoStatus);
    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar Status!")
    }
}

export async function salvarProduto(produto: Produto): Promise<void> {
    var dadosResult = await api.post<number>('/produtos', produto)
        if (dadosResult.status === 200 || dadosResult.status === 201) {
          alert("Produto salvo com sucesso! Código: " + dadosResult.data)
        } 
}


export async function editarProduto(produto: Produto) {
    var dadosResult = await api.put<number>('/produtos/' + produto.id, produto)
        if (dadosResult.status === 200) {
          alert("Produto atualizado com sucesso!")
        }
}

export async function produtoPorId(id: number){
    const response = await api.get<Produto>('/produtos/' + id)
            return response.data;
}