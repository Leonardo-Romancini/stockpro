package com.senac.stockpro.backstockpro.domain.repository;

import com.senac.stockpro.backstockpro.domain.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    Optional<Produto> findByIdAndUsuario_Id(Long id, Long usuarioId);

    List<Produto> getProdutoByUsuario_IdOrderByIdAsc(Long usuario);

    List<Produto> findAllByOrderByIdAsc();
}
