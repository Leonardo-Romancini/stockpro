package com.senac.stockpro.backstockpro.domain.repository;

import com.senac.stockpro.backstockpro.domain.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    List<Usuario> findAllByOrderByIdAsc();

    boolean existsUsuarioByEmailContainingAndSenha(String email, String senha);
}
