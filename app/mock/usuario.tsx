import { Usuario } from "../context/AuthContext";

export class UsuarioMock {

    private static usuarioDB: Usuario[] = [
        new Usuario(1, "Leonardo Vieira", "345246", ""),
        new Usuario(2, "Vieira Eonardo", "86578659", ""),
        new Usuario(3, "Lon ardo Eira", "6745756475", ""),
        new Usuario(4, "Leo Vivo", "6543456", ""),
        new Usuario(5, "ardo Vie", "75647576", "")
    ];

    static async listarTodos(): Promise<Usuario[]> {
        return [...this.usuarioDB]
    }

    /*static async salvar(usuario: Usuario): Promise<void> {

        const indexExistente = this.usuarioDB.findIndex(u => u.id === usuario.id);

        if (indexExistente === -1) {

            const novoCodigo = Math.max(...this.usuarioDB.map(u => u.id)) + 1;

            usuario.id = novoCodigo;

            this.usuarioDB.push(usuario);

            console.log(`Usuário de ID ${novoCodigo} salvo com sucesso!`)

        } else {
            this.usuarioDB[indexExistente].nome = usuario.nome;
            this.usuarioDB[indexExistente].email = usuario.email;

            console.log(`Usuario de ID ${usuario.id} atualizado com sucesso!`)
        }
    } */

    static async buscarPorId(codigo: Number): Promise<Usuario | undefined> {

        return this.usuarioDB.find(u => u.id === codigo)
    }


}