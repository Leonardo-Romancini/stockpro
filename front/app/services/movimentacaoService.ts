import { Movimentacao } from "../types/movimentacoes";
import api from "./api";


export async function buscarListaMovimentacoes(): Promise<Movimentacao[]> {
    const dados = await api.get<Movimentacao[]>('/movimentacoes');
            if (dados.status == 200){
                return dados.data
            }     
    return[]
}

export async function movimentacaoPorId(id: number){
    const response = await api.get<Movimentacao>('/movimentacoes/' + id)
            return response.data;
}

export async function salvarMovimentacao(movimentacao: Movimentacao): Promise<void> {
    var dadosResult = await api.post<number>('/movimentacoes', movimentacao)
        if (dadosResult.status === 200 || dadosResult.status === 201) {
          alert("Movimentação salva com sucesso! Código: " + dadosResult.data)
        } 
}

//pelo uso de RequestParam
export async function pesquisarMovimentacoes(pesquisa: string): Promise<Movimentacao[]> {
    const response = await api.get<Movimentacao[]>('/movimentacoes/pesquisa', {
        params: { pesquisa }
    });
    if (response.status === 200) {
        console.log(response.data);
        return response.data;
    }
    return [];
}