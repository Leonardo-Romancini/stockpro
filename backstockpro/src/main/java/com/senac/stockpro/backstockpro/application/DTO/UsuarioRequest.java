package com.senac.stockpro.backstockpro.application.DTO;

public record UsuarioRequest(
        String nome,
        String email,
        String senha
) {
}
