package com.senac.stockpro.backstockpro.controllers;

import com.senac.stockpro.backstockpro.model.DTO.AlterarStatusProdutoRequest;
import com.senac.stockpro.backstockpro.model.entities.Produto;
import com.senac.stockpro.backstockpro.model.repository.ProdutoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@Tag(description = "Serviço responsável por controlar a criação, listagem e edição de produtos",name = "Serviço produto")
public class ProdutoController {

        @Autowired
        private ProdutoRepository produtoRepository;

        @GetMapping
        @Operation(description = "Realiza uma listagem de todos os produtos no banco", summary = "Listagem todos")
        public ResponseEntity<List<?>> listarTodos(){
            return ResponseEntity.ok(produtoRepository.findAllByOrderByIdAsc());
        }

        @GetMapping("/{id}")
        @Operation(description = "Realiza uma busca de um produto através de seu ID", summary = "Listar produto")
        public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
            return ResponseEntity.ok(produtoRepository.findById(id).orElse(null));
        }

        @PostMapping
        @Operation(description = "Registra um novo produto no banco", summary = "Salvar produto")
        public ResponseEntity<Long> salvar(@RequestBody Produto produto){
            return ResponseEntity.ok(produtoRepository.save(produto).getId());
        }

        @PutMapping("/{id}")
        @Operation(description = "Registra a edição de um produto através de seu ID", summary = "Editar produto")
        public  ResponseEntity<?> salvar (@PathVariable Long id, @RequestBody Produto produto){
            var produtoBanco = produtoRepository.findById(id).orElse(null);

            if (produtoBanco != null) {
                produtoBanco.setNome(produto.getNome());
                produtoBanco.setSKU(produto.getSKU());
                produtoBanco.setEstoque(produto.getEstoque());
                produtoBanco.setPreco(produto.getPreco());
                produtoBanco.setEstoqueMin(produto.getEstoqueMin());
                produtoRepository.save(produtoBanco);
                return ResponseEntity.ok("Atualizado com sucesso");
            }

            return ResponseEntity.notFound().build();
        }

    @PutMapping("/{id}/AlterarStatus")
    @Operation(description = "Realiza a alteração do status do produto para ATIVO ou INATIVO", summary = "Altera status")
    public ResponseEntity<?> AlterarStatus(@PathVariable Long id, @RequestBody AlterarStatusProdutoRequest statusRequest){
        var produtoBanco = produtoRepository.findById(id).orElse(null);
        if (produtoBanco != null) {
            produtoBanco.setStatus(statusRequest.status());
            produtoRepository.save(produtoBanco);

            return ResponseEntity.ok("Atualizado com sucesso");
        }
        return ResponseEntity.notFound().build();
    }
}
