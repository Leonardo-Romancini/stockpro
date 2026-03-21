export class Fornecedor {
    constructor(
        public codigo: number,
        public rzsocial: string,
        public nomef: string,
        public CNPJ: string,
        public email: string,
        public ativo: boolean
    ) { }
}
 
export class FornecedorMock {
 
    private static fornecedorDB: Fornecedor[] = [
        new Fornecedor(1, "Tech Solutions Ltda", "TechSol", "12.345.678/0001-01", "contato@techsol.com", true),
        new Fornecedor(2, "Logística Global S.A.", "LogGlobal", "98.765.432/0001-99", "vendas@logglobal.com.br", true),
        new Fornecedor(3, "Materiais de Construção Silva", "Silva Materiais", "11.222.333/0001-44", "financeiro@silvamateriais.com", false),
        new Fornecedor(4, "Distribuidora de Alimentos S.A.", "DistriFood", "55.666.777/0001-88", "sac@distrifood.com", true),
        new Fornecedor(5, "Inova Tecnologia EIRELI", "InovaTech", "44.555.666/0001-22", "suporte@inovatech.net", true)
    ];
 
    static async listarTodos(): Promise<Fornecedor[]>{
            return [...this.fornecedorDB]
        }
 
        static async salvar(fornecedor: Fornecedor):Promise<void> {
       
                const indexExistente = this.fornecedorDB.findIndex(f=> f.codigo === fornecedor.codigo);
       
                if(indexExistente=== -1){
       
                    const novoCodigo = Math.max(...this.fornecedorDB.map(f=>f.codigo))+1;
       
                fornecedor.codigo = novoCodigo;
       
                this.fornecedorDB.push(fornecedor);
       
                console.log(`Fornececdor de ID ${novoCodigo} salvo com sucesso!`)
       
                }else{
                    this.fornecedorDB[indexExistente].rzsocial = fornecedor.rzsocial;
                    this.fornecedorDB[indexExistente].nomef = fornecedor.nomef;
                    this.fornecedorDB[indexExistente].CNPJ = fornecedor.CNPJ;
                    this.fornecedorDB[indexExistente].email = fornecedor.email;
       
                    console.log(`Fornecedor de ID ${fornecedor.codigo} atualizado com sucesso!`)
                }
            }

            static async buscarPorId(codigo: Number): Promise<Fornecedor | undefined> {
            
                    return this.fornecedorDB.find(f => f.codigo === codigo)
                }
 
}