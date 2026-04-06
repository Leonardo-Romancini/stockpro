package com.senac.stockpro.backstockpro.model.entities;

import com.senac.stockpro.backstockpro.model.enuns.EnumMovimentacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "movimentacao")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movimentacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private EnumMovimentacao tipo;

    private Integer quantidade;

    private LocalDateTime data;
}
