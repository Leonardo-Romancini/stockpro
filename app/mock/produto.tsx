export class Produto{
    constructor (
        public id: number|null,
        public nome: string,
        public SKU: string,
        public estoque: number,
        public preco: number,
        public estoqueMin: number,
        public fornecedor: number,
        public status: string
    ) {}
}