import { Usuario } from "../types/usuarios";
import api from "./api";


export async function buscarListaUsuarios(): Promise<Usuario[]> {
    const dados = await api.get<Usuario[]>('/usuarios');

            if (dados.status == 200){
                return dados.data
            } 
        
    return[]
}

export async function AlterarStatusUsuario(usuario: Usuario): Promise<void> {
    
    var novoStatus = {};
    if (usuario.status === "ATIVO"){
        novoStatus = {status: "INATIVO"};
    } else {
        novoStatus = {status: "ATIVO"}
    }

    const dadosResult = await api.put<string>('/usuarios/'+usuario.id+'/AlterarStatus', novoStatus);
    
}
