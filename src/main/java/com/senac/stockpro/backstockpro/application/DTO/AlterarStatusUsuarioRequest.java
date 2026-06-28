package com.senac.stockpro.backstockpro.application.DTO;

import com.senac.stockpro.backstockpro.domain.enuns.EnumStatusUsuario;

public record AlterarStatusUsuarioRequest(EnumStatusUsuario status) {
}
