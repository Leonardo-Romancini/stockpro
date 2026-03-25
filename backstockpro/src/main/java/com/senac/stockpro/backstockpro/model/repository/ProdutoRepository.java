package com.senac.stockpro.backstockpro.model.repository;

import com.senac.stockpro.backstockpro.model.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
