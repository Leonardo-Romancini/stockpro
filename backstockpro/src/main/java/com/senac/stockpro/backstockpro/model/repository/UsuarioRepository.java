package com.senac.stockpro.backstockpro.model.repository;

import com.senac.stockpro.backstockpro.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
