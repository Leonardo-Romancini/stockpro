package com.senac.stockpro.backstockpro.application.DTO;

import com.senac.stockpro.backstockpro.domain.entities.Produto;


public record ProdutoResponse(
        String id,
        String nome,
        String SKU,
        Integer estoque,
        Double preco,
        Integer estoqueMin,
        Long fornecedor,
        String status
) {
    public ProdutoResponse(Produto produto){
        this(
                produto.getId().toString(),
                produto.getNome(),
                produto.getSKU(),
                produto.getEstoque(),
                produto.getPreco(),
                produto.getEstoqueMin(),
                produto.getFornecedor() != null ? produto.getFornecedor().getId() : null,
                produto.getStatus().toString()
        );
    }
}
