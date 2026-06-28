package com.senac.stockpro.backstockpro.application.DTO;

public record FornecedorDeskRequest(
        String rzsocial,
        String nomef,
        String cnpj,
        String email,
        Long usuarioId,
        String secretKey
) {
}
