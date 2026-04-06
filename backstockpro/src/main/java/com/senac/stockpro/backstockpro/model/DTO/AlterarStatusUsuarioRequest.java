package com.senac.stockpro.backstockpro.model.DTO;

import com.senac.stockpro.backstockpro.model.enuns.EnumStatusUsuario;

public record AlterarStatusUsuarioRequest(EnumStatusUsuario status) {
}
