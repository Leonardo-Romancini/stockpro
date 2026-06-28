package com.senac.stockpro.backstockpro.application.services;

import com.senac.stockpro.backstockpro.application.DTO.*;
import com.senac.stockpro.backstockpro.domain.entities.Movimentacao;
import com.senac.stockpro.backstockpro.domain.entities.Usuario;
import com.senac.stockpro.backstockpro.domain.repository.MovimentacaoRepository;
import com.senac.stockpro.backstockpro.domain.repository.ProdutoRepository;
import com.senac.stockpro.backstockpro.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovimentacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    public List<MovimentacaoResponse> ListarTodos() {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            List<Movimentacao> lista;

            if ("ROLE_ADMIN".equals(usuarioLogado.getRole())) {
                lista = movimentacaoRepository.findAllByOrderByIdAsc();
            } else {
                lista = movimentacaoRepository.getMovimentacaoByUsuario_IdOrderByIdAsc(usuarioLogado.getId());
            }

            return lista.stream()
                    .map(MovimentacaoResponse::new)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            throw new RuntimeException("Erro ao listar movimentações", e);
        }
    }

    public MovimentacaoResponse BuscarMovimentacaoPorId(Long id) {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Movimentacao movimentacao;

            if ("ROLE_ADMIN".equals(usuarioLogado.getRole())) {
                movimentacao = movimentacaoRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Movimentação não encontrada"));
            } else {
                movimentacao = movimentacaoRepository.findByIdAndUsuario_Id(id, usuarioLogado.getId())
                        .orElseThrow(() -> new RuntimeException("Movimentação não encontrada ou acesso negado"));
            }
            return new MovimentacaoResponse(movimentacao);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar movimentação: " + e.getMessage());
        }
    }

    public List<MovimentacaoResponse> PesquisarMovimentacao(String pesquisa) {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // Busca no repositório filtrando pelo ID do usuário e pelo nome do produto
            List<Movimentacao> movimentacoes = movimentacaoRepository
                    .findByUsuario_IdAndProduto_NomeContainingIgnoreCaseOrderByIdAsc(usuarioLogado.getId(), pesquisa);
            return movimentacoes.stream()
                    .map(MovimentacaoResponse::new)
                    .toList();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao realizar pesquisa de movimentações", e);
        }
    }

    public Long SalvarNovimentacao(MovimentacaoRequest movimentacao) {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Movimentacao novaMovimentacao = new Movimentacao(movimentacao);

            if (movimentacao.produtoId() != null) {
                var produto = produtoRepository.findById(movimentacao.produtoId())
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado com o ID: " + movimentacao.produtoId()));
                novaMovimentacao.setProduto(produto);
            }

            if (usuarioLogado != null && usuarioLogado.getId() != null) {
                Usuario usuario = usuarioRepository.findById(usuarioLogado.getId())
                        .orElseThrow(() -> new RuntimeException("Usuário logado não encontrado!"));
                novaMovimentacao.setUsuario(usuario);
            } else {
                throw new RuntimeException("Usuário não está autenticado corretamente!");
            }

            return movimentacaoRepository.save(novaMovimentacao).getId();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



}
