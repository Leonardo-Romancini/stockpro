package com.senac.stockpro.backstockpro.domain.repository;

import com.senac.stockpro.backstockpro.domain.entities.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor,Long> {

    Optional<Fornecedor> findByIdAndUsuario_Id(Long id, Long usuarioId);

    List<Fornecedor> getFornecedoresByUsuario_IdOrderByIdAsc(Long usuario);

    List<Fornecedor> findAllByOrderByIdAsc();
}
