package com.senac.stockpro.backstockpro.application.services;

import com.senac.stockpro.backstockpro.application.DTO.*;
import com.senac.stockpro.backstockpro.domain.entities.Produto;
import com.senac.stockpro.backstockpro.domain.entities.Usuario;
import com.senac.stockpro.backstockpro.domain.repository.FornecedorRepository;
import com.senac.stockpro.backstockpro.domain.repository.ProdutoRepository;
import com.senac.stockpro.backstockpro.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private FornecedorRepository fornecedorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<ProdutoResponse> ListarTodos() {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            List<Produto> lista;

            if ("ROLE_ADMIN".equals(usuarioLogado.getRole())) {
                lista = produtoRepository.findAllByOrderByIdAsc();
            } else {
                lista = produtoRepository.getProdutoByUsuario_IdOrderByIdAsc(usuarioLogado.getId());
            }

            return lista.stream()
                    .map(ProdutoResponse::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar lista de produtos", e);
        }
    }


    public ProdutoResponse BuscarProdutoPorId(Long id) {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Produto produto;

            if ("ROLE_ADMIN".equals(usuarioLogado.getRole())) {
                produto = produtoRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            } else {
                produto = produtoRepository.findByIdAndUsuario_Id(id, usuarioLogado.getId())
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado ou acesso negado"));
            }

            return new ProdutoResponse(produto);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar produto: " + e.getMessage());
        }
    }

    public boolean AlterarStatus(AlterarStatusProdutoRequest statusRequest, Long id) {
        try {
            var produtoBanco = produtoRepository.findById(id).orElse(null);
            if (produtoBanco != null) {
                produtoBanco.setStatus(statusRequest.status());
                produtoRepository.save(produtoBanco);
                return true;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return false;
    }

    public boolean AlterarProduto(Long id, ProdutoRequest produto) {

        try {
            var produtoBanco = produtoRepository.findById(id).orElse(null);
            if (produtoBanco != null) {
                produtoBanco.setNome(produto.nome());
                produtoBanco.setSKU(produto.SKU());
                produtoBanco.setEstoque(produto.estoque());
                produtoBanco.setPreco(produto.preco());
                produtoBanco.setEstoqueMin(produto.estoqueMin());

                var fornecedor = fornecedorRepository.findById(produto.fornecedorId())
                        .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado com o ID: " + produto.fornecedorId()));
                produtoBanco.setFornecedor(fornecedor);

                produtoRepository.save(produtoBanco);
                return true;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return false;
    }

    public Long SalvarProduto(ProdutoRequest produto) {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            Produto novoProduto = new Produto(produto);

            //Busca o Fornecedor real no banco de dados e vincula ao produto
            if (produto.fornecedorId() != null) {
                var fornecedor = fornecedorRepository.findById(produto.fornecedorId())
                        .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado com o ID: " + produto.fornecedorId()));
                novoProduto.setFornecedor(fornecedor);
            }

            if (usuarioLogado != null && usuarioLogado.getId() != null) {
                var usuario = usuarioRepository.findById(usuarioLogado.getId())
                        .orElseThrow(() -> new RuntimeException("Usuário logado não encontrado no banco de dados!"));
                novoProduto.setUsuario(usuario);
            } else {
                throw new RuntimeException("Usuário não está autenticado corretamente!");
            }

            //Salva o produto já com todos os relacionamentos gerenciados pelo JPA
            return produtoRepository.save(novoProduto).getId();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public EstatisticaProdutoResponse obterEstatisticasProduto() {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        long total;
        long criticos;

        if ("ROLE_ADMIN".equals(usuarioLogado.getRole())) {
            total = produtoRepository.count();
            criticos = produtoRepository.countEstoqueCriticoAdmin();
        } else {
            total = produtoRepository.countByUsuario_Id(usuarioLogado.getId());
            criticos = produtoRepository.countEstoqueCriticoUsuario(usuarioLogado.getId());
        }

        return new EstatisticaProdutoResponse(total, criticos);
    }
}


