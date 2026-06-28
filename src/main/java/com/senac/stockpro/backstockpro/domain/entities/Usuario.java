package com.senac.stockpro.backstockpro.domain.entities;

import com.senac.stockpro.backstockpro.application.DTO.UsuarioAdmRequest;
import com.senac.stockpro.backstockpro.application.DTO.UsuarioRequest;
import com.senac.stockpro.backstockpro.domain.enuns.EnumStatusUsuario;
import com.senac.stockpro.backstockpro.domain.valueobjects.CNPJ;
import jakarta.persistence.*;
import lombok.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    private String senha;

    //pega o valor de cnpj de dentro do CNPJ
    @Embedded
    private CNPJ cnpj;

    private String role;

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;

    @OneToMany(mappedBy = "usuario")
    private List<Fornecedor> fornecedores;

    @OneToMany(mappedBy = "usuario")
    private List<Produto> produtos;


    public Usuario(UsuarioRequest usuario){
        this.email = usuario.email();
        this.nome = usuario.nome();
        this.senha = usuario.senha();
        this.cnpj = new CNPJ(usuario.cnpj());
        this.role = "ROLE_USER";
    }

    public Usuario(UsuarioAdmRequest usuario){
        this.email = usuario.email();
        this.nome = usuario.nome();
        this.senha = usuario.senha();
        this.cnpj = new CNPJ(usuario.cnpj());
        this.role = "ROLE_ADMIN";
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role));
    }

    @Override
    public @Nullable String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }
}
