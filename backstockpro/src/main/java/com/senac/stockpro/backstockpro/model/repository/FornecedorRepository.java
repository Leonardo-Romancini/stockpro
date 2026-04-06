package com.senac.stockpro.backstockpro.model.repository;

import com.senac.stockpro.backstockpro.model.entities.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor,Long> {
    List<Fornecedor> findAllByOrderByIdAsc();
}
