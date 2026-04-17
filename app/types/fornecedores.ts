export class Fornecedor {
    constructor(
        public id: number|null,
        public rzsocial: string,
        public nomef: string,
        public cnpj: string,
        public email: string,
        public status: string
    ) { }
}

export interface FornecedorFormProps {
    fornecedorExistente?: Fornecedor
}