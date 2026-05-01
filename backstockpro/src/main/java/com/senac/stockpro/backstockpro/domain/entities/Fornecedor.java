package com.senac.stockpro.backstockpro.domain.entities;

import com.senac.stockpro.backstockpro.domain.enuns.EnumStatusFornecedor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fornecedor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rzsocial;

    private String nomef;

    private String cnpj;

    private String email;

    private EnumStatusFornecedor status = EnumStatusFornecedor.ATIVO;
}
