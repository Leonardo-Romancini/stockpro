package com.senac.stockpro.backstockpro.domain.repository;

import com.senac.stockpro.backstockpro.domain.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    Optional<Produto> findByIdAndUsuario_Id(Long id, Long usuarioId);

    List<Produto> getProdutoByUsuario_IdOrderByIdAsc(Long usuario);

    List<Produto> findAllByOrderByIdAsc();

    //comandos para o home
    long count();

    long countByUsuario_Id(Long usuarioId);

    //utilizando o Query para não precisar ficar passando parâmetros
    @Query("SELECT COUNT(p) FROM Produto p WHERE p.estoque <= p.estoqueMin")
    long countEstoqueCriticoAdmin();

    @Query("SELECT COUNT(p) FROM Produto p WHERE p.usuario.id = :usuarioId AND p.estoque <= p.estoqueMin")
    long countEstoqueCriticoUsuario(@Param("usuarioId") Long usuarioId);
}
