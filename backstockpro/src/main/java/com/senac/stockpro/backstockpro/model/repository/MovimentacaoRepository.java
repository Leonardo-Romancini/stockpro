package com.senac.stockpro.backstockpro.model.repository;

import com.senac.stockpro.backstockpro.model.entities.Movimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
    List<Movimentacao> findAllByOrderByIdAsc();
}
