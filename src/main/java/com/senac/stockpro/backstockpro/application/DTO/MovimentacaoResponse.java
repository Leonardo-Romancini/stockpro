package com.senac.stockpro.backstockpro.application.DTO;

import com.senac.stockpro.backstockpro.domain.entities.Movimentacao;
import com.senac.stockpro.backstockpro.domain.enuns.EnumMovimentacao;

import java.time.LocalDateTime;

public record MovimentacaoResponse(
        String id,
        EnumMovimentacao tipo,
        Integer quantidade,
        LocalDateTime data,
        Long produto
) {
    public MovimentacaoResponse(Movimentacao movimentacao){
        this(
                movimentacao.getId().toString(),
                movimentacao.getTipo(),
                movimentacao.getQuantidade(),
                movimentacao.getData(),
                movimentacao.getProduto() != null ? movimentacao.getProduto().getId() : null
        );
    }
}
