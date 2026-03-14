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

    static async salvar(usuario: Usuario):Promise<void> {

        const indexExistente = this.usuarioDB.findIndex(u=> u.codigo === usuario.codigo);

        if(indexExistente=== -1){

            const novoCodigo = Math.max(...this.usuarioDB.map(u=>u.codigo))+1;

        usuario.codigo = novoCodigo;

        this.usuarioDB.push(usuario);

        console.log(`Usuário de ID ${novoCodigo} salvo com sucesso!`)

        }else{
            this.usuarioDB[indexExistente].name = usuario.name;
            this.usuarioDB[indexExistente].CPF = usuario.CPF;

            console.log(`Usuario de ID ${usuario.codigo} atualizado com sucesso!`)
        }
    }

    static async buscarPorId(codigo:Number):Promise<Usuario|undefined>{
         
        return this.usuarioDB.find(u=>u.codigo === codigo)
    }


}