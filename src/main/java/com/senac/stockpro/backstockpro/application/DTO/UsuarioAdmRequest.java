package com.senac.stockpro.backstockpro.application.DTO;

public record UsuarioAdmRequest(
        String nome,
        String email,
        String senha,
        String cnpj,
        String secretKey
) {
}
