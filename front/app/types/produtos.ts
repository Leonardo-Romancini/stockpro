export class Produto{
    constructor (
        public id: number|null,
        public nome: string,
        public SKU: string,
        public estoque: number,
        public preco: number,
        public estoqueMin: number,
        public fornecedorId: number|null,
        public status: string,
    ) {}
}

export interface ProdutoFormProps {
    produtoExistente?: Produto
}