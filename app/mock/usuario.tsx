import { Usuario } from "../context/AuthContext";

export class UsuarioMock{

    private static usuarioDB: Usuario[] = [
        new Usuario(1,"Leonardo Vieira","345246",true),
        new Usuario(2,"Vieira Eonardo","86578659",true),
        new Usuario(3,"Lon ardo Eira","6745756475",true),
        new Usuario(4,"Leo Vivo","6543456",true),
        new Usuario(5,"ardo Vie","75647576",true)
    ];

    static async listarTodos(): Promise<Usuario[]>{
        return [...this.usuarioDB]
    }
}