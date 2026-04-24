import { Usuario } from "../types/usuarios";
import api from "./api";


export async function buscarListaUsuarios(): Promise<Usuario[]> {
    const dados = await api.get<Usuario[]>('/usuarios');

            if (dados.status == 200){
                return dados.data
            } 
        
    return[]
}

export async function alterarStatusUsuario(usuario: Usuario): Promise<void> {
    
    var novoStatus = {};
    if (usuario.status === "ATIVO"){
        novoStatus = {status: "INATIVO"};
    } else {
        novoStatus = {status: "ATIVO"}
    }

    const dadosResult = await api.put<string>('/usuarios/'+usuario.id+'/AlterarStatus', novoStatus);
    
    if (dadosResult.status !== 200) {
        alert("Erro ao atualizar Status!")
    }
}

export async function salvarUsuario(usuario: Usuario): Promise<void> {
    var dadosResult = await api.post<number>('/usuarios', usuario)
        if (dadosResult.status === 200 || dadosResult.status === 201) {
          alert("Usuário salvo com sucesso! Código: " + dadosResult.data)
        } 
}
