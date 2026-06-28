package com.senac.stockpro.backstockpro.application.DTO;

public record ProdutoRequest (
        String nome,
        String SKU,
        Integer estoque,
        Double preco,
        Integer estoqueMin,
        Long fornecedorId
){
}
