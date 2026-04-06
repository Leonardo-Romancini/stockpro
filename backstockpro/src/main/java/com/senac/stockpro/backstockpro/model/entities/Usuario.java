package com.senac.stockpro.backstockpro.model.entities;

import com.senac.stockpro.backstockpro.model.enuns.EnumStatusUsuario;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    private String senha;

    private String cnpj;

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;


}
