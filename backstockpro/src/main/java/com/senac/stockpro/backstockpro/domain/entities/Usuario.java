package com.senac.stockpro.backstockpro.domain.entities;

import com.senac.stockpro.backstockpro.application.DTO.UsuarioRequest;
import com.senac.stockpro.backstockpro.domain.enuns.EnumStatusUsuario;
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

    private String cnpj;

    private String role;

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;

    public Usuario(UsuarioRequest usuario){
        this.email = usuario.email();
        this.nome = usuario.nome();
        this.senha = usuario.senha();
        this.role = "ROLE_USER";
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
