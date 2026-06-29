package com.senac.stockpro.backstockpro.domain.entities;

import com.senac.stockpro.backstockpro.application.DTO.MovimentacaoRequest;
import com.senac.stockpro.backstockpro.domain.enuns.EnumMovimentacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "movimentacao")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movimentacao {

    public Movimentacao(MovimentacaoRequest movimentacao){
        this.tipo = movimentacao.tipo();
        this.quantidade = movimentacao.quantidade();
        this.data = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private EnumMovimentacao tipo;

    private Integer quantidade;

    private LocalDateTime data;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "produto_id", referencedColumnName = "id")
    private Produto produto;
}
