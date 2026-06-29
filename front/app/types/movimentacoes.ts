export class Movimentacao {
    constructor (
        public id: number|null,
        public tipo: string,
        public quantidade: number,
        public data: string|null,
        public produtoId?: number|null,
        public nomeProduto?: string
    ) {}
}

export interface MovimentacaoFormProps {
    movimentacaoExistente?: Movimentacao
}