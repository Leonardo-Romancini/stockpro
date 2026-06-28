package com.senac.stockpro.backstockpro.application.DTO;

import com.senac.stockpro.backstockpro.domain.entities.Fornecedor;

public record FornecedorResponse (
        String id,
        String rzsocial,
        String nomef,
        String cnpj,
        String email
){
    public FornecedorResponse (Fornecedor fornecedor){
        this(
                fornecedor.getId().toString(),
                fornecedor.getRzsocial(),
                fornecedor.getNomef(),
                fornecedor.getCnpj(),
                fornecedor.getEmail()
        );
    }
}
