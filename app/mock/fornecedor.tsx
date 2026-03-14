export class Fornecedor {
    constructor(
        public codigo: number,
        public rzsocial: string,
        public nomef: string,
        public CNPJ: string,
        public desc: string,
        public endereco: string,
        public ativo: boolean
    ) { }
}

export class FornecedorMock {


}