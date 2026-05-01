package com.senac.stockpro.backstockpro.application.services;

import com.senac.stockpro.backstockpro.application.DTO.AlterarStatusProdutoRequest;
import com.senac.stockpro.backstockpro.domain.entities.Produto;
import com.senac.stockpro.backstockpro.domain.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> ListarTodos() {
        try{
            return produtoRepository.findAllByOrderByIdAsc();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Produto BuscarProdutoPorId(Long id) {
        try {
            return  produtoRepository.findById(id).orElse(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
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

    public boolean AlterarProduto(Long id, Produto produto) {

        try {
            var produtoBanco = produtoRepository.findById(id).orElse(null);
            if (produtoBanco != null) {
                produtoBanco.setNome(produto.getNome());
                produtoBanco.setSKU(produto.getSKU());
                produtoBanco.setEstoque(produto.getEstoque());
                produtoBanco.setPreco(produto.getPreco());
                produtoBanco.setEstoqueMin(produto.getEstoqueMin());
                produtoRepository.save(produtoBanco);
                return true;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return false;
    }


}
