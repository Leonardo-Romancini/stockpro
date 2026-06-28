package com.senac.stockpro.backstockpro.domain.repository;

import com.senac.stockpro.backstockpro.domain.entities.Movimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {

    Optional<Movimentacao> findByIdAndUsuario_Id(Long id, Long usuarioId);

    List<Movimentacao> getMovimentacaoByUsuario_IdOrderByIdAsc(Long usuario);

    //comando enorme para pesquisar na barra de pesquisa utilizando o usuário e o que foi escrito
    List<Movimentacao> findByUsuario_IdAndProduto_NomeContainingIgnoreCaseOrderByIdAsc(Long usuarioId, String produtoNome);

    List<Movimentacao> findAllByOrderByIdAsc();
}
