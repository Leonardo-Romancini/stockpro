package com.senac.stockpro.backstockpro.application.DTO;

import com.senac.stockpro.backstockpro.domain.enuns.EnumMovimentacao;

import java.time.LocalDateTime;

public record MovimentacaoRequest(
        EnumMovimentacao tipo,
        Integer quantidade,
        LocalDateTime data,
        Long produtoId
) {
}
