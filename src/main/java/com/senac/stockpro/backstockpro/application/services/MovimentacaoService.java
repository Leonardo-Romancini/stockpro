package com.senac.stockpro.backstockpro.application.services;

import com.senac.stockpro.backstockpro.application.DTO.*;
import com.senac.stockpro.backstockpro.domain.entities.Movimentacao;
import com.senac.stockpro.backstockpro.domain.entities.Produto;
import com.senac.stockpro.backstockpro.domain.entities.Usuario;
import com.senac.stockpro.backstockpro.domain.enuns.EnumMovimentacao;
import com.senac.stockpro.backstockpro.domain.exception.NegocioException;
import com.senac.stockpro.backstockpro.domain.repository.MovimentacaoRepository;
import com.senac.stockpro.backstockpro.domain.repository.ProdutoRepository;
import com.senac.stockpro.backstockpro.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public Long SalvarMovimentacao(MovimentacaoRequest movimentacao) {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Movimentacao novaMovimentacao = new Movimentacao(movimentacao);

        // Busca o produto
        Produto produto = produtoRepository.findById(movimentacao.produtoId())
                .orElseThrow(() -> new NegocioException("Produto não encontrado com o ID: " + movimentacao.produtoId()));

        // Lógica de estoque
        if (movimentacao.tipo() == EnumMovimentacao.ENTRADA) {
            produto.setEstoque(produto.getEstoque() + movimentacao.quantidade());
        } else if (movimentacao.tipo() == EnumMovimentacao.SAIDA) {
            if (produto.getEstoque() < movimentacao.quantidade()) {
                throw new NegocioException("Estoque insuficiente para a saída solicitada.");
            }
            produto.setEstoque(produto.getEstoque() - movimentacao.quantidade());
        }

        produtoRepository.save(produto);
        novaMovimentacao.setProduto(produto);

        // Busca o usuário
        Usuario usuario = usuarioRepository.findById(usuarioLogado.getId())
                .orElseThrow(() -> new NegocioException("Usuário logado não encontrado!"));

        novaMovimentacao.setUsuario(usuario);

        return movimentacaoRepository.save(novaMovimentacao).getId();
    }

    public EstatisticaMovimentacaoResponse obterEstatisticasMovimentacao() {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        long entradas;
        long saidas;

        if ("ROLE_ADMIN".equals(usuarioLogado.getRole())) {
            entradas = movimentacaoRepository.countEntradasAdmin();
            saidas = movimentacaoRepository.countSaidasAdmin();
        } else {
            entradas = movimentacaoRepository.countEntradasPorUsuario(usuarioLogado.getId());
            saidas = movimentacaoRepository.countSaidasPorUsuario(usuarioLogado.getId());
        }

        return new EstatisticaMovimentacaoResponse(entradas, saidas);
    }

}
