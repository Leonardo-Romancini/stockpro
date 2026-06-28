export class Movimentacao {
    constructor (
        public id: number|null,
        public tipo: string,
        public quantidade: number,
        public data: Date|null,
        public produtoId?: number|null
    ) {}
}

export interface MovimentacaoFormProps {
    movimentacaoExistente?: Movimentacao
}