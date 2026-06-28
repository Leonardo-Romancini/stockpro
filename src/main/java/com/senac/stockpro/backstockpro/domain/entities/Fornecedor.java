package com.senac.stockpro.backstockpro.domain.entities;

import com.senac.stockpro.backstockpro.application.DTO.FornecedorDeskRequest;
import com.senac.stockpro.backstockpro.application.DTO.FornecedorRequest;
import com.senac.stockpro.backstockpro.domain.enuns.EnumStatusFornecedor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "fornecedor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fornecedor {

    public Fornecedor(FornecedorRequest fornecedor){
        this.rzsocial = fornecedor.rzsocial();
        this.nomef = fornecedor.nomef();
        this.cnpj = fornecedor.cnpj();
        this.email = fornecedor.email();
    }

    public Fornecedor(FornecedorDeskRequest fornecedor){
        this.rzsocial = fornecedor.rzsocial();
        this.nomef = fornecedor.nomef();
        this.cnpj = fornecedor.cnpj();
        this.email = fornecedor.email();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rzsocial;

    private String nomef;

    private String cnpj;

    private String email;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    @OneToMany(mappedBy = "fornecedor")
    private List<Produto> produtos;

    private EnumStatusFornecedor status = EnumStatusFornecedor.ATIVO;
}
