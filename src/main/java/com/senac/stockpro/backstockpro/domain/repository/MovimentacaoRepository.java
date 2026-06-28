package com.senac.stockpro.backstockpro.domain.repository;

import com.senac.stockpro.backstockpro.domain.entities.Movimentacao;
import com.senac.stockpro.backstockpro.domain.enuns.EnumMovimentacao;
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

    //comandos para a home
    long countByTipo(EnumMovimentacao tipo);

    default long countEntradasAdmin() {
        return countByTipo(EnumMovimentacao.ENTRADA);
    }

    default long countSaidasAdmin() {
        return countByTipo(EnumMovimentacao.SAIDA);
    }

    long countByTipoAndUsuario_Id(EnumMovimentacao tipo, Long usuarioId);

    default long countEntradasPorUsuario(Long usuarioId) {
        return countByTipoAndUsuario_Id(EnumMovimentacao.ENTRADA, usuarioId);
    }

    default long countSaidasPorUsuario(Long usuarioId) {
        return countByTipoAndUsuario_Id(EnumMovimentacao.SAIDA, usuarioId);
    }
}
