package com.senac.stockpro.backstockpro.domain.entities;

import com.senac.stockpro.backstockpro.application.DTO.ProdutoRequest;
import com.senac.stockpro.backstockpro.domain.enuns.EnumStatusProduto;
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

    public Produto(ProdutoRequest produto){
        this.nome = produto.nome();
        this.SKU = produto.SKU();
        this.estoque = produto.estoque();
        this.preco = produto.preco();
        this.estoqueMin = produto.estoqueMin();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String SKU;

    private Integer  estoque;

    private Double preco;

    private Integer estoqueMin;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fornecedor_id", referencedColumnName = "id")
    private Fornecedor fornecedor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    private EnumStatusProduto status = EnumStatusProduto.ATIVO;
}
