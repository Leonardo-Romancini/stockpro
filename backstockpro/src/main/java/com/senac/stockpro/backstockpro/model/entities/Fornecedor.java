package com.senac.stockpro.backstockpro.model.entities;

import com.senac.stockpro.backstockpro.model.enuns.EnumStatusFornecedor;
import jakarta.persistence.*;

@Entity
@Table(name = "fornecedor")
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rzsocial;

    private String nomef;

    private String cnpj;

    private String email;

    private EnumStatusFornecedor status = EnumStatusFornecedor.ATIVO;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRzsocial() {
        return rzsocial;
    }

    public void setRzsocial(String rzsocial) {
        this.rzsocial = rzsocial;
    }

    public String getNomef() {
        return nomef;
    }

    public void setNomef(String nomef) {
        this.nomef = nomef;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EnumStatusFornecedor getStatus() {
        return status;
    }

    public void setStatus(EnumStatusFornecedor status) {
        this.status = status;
    }
}
