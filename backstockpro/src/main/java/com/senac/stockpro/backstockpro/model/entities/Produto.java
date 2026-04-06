package com.senac.stockpro.backstockpro.model.entities;

import com.senac.stockpro.backstockpro.model.enuns.EnumStatusProduto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "produto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String SKU;

    private Integer  estoque;

    private Double preco;

    private Integer estoqueMin;

    private Integer fornecedor;

    private EnumStatusProduto status = EnumStatusProduto.ATIVO;
}
