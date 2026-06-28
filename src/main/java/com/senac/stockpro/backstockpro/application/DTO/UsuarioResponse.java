package com.senac.stockpro.backstockpro.application.DTO;

import com.senac.stockpro.backstockpro.domain.entities.Usuario;

public record UsuarioResponse (
        Long id,
        String nome,
        String email,
        String status
){
    public UsuarioResponse(Usuario usuario){
        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getStatus().toString()
        );
    }
}
