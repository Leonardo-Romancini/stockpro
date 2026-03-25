package com.senac.stockpro.backstockpro.controllers;

import com.senac.stockpro.backstockpro.model.entities.Produto;
import com.senac.stockpro.backstockpro.model.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

        @Autowired
        private ProdutoRepository produtoRepository;

        @GetMapping
        public ResponseEntity<List<?>> listarTodos(){
            return ResponseEntity.ok(produtoRepository.findAll());
        }

        @GetMapping("/{id}")
        public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
            return ResponseEntity.ok(produtoRepository.findById(id).orElse(null));
        }

        @PostMapping
        public ResponseEntity<Long> salvar(@RequestBody Produto produto){
            return ResponseEntity.ok(produtoRepository.save(produto).getId());
        }

        @PutMapping("/{id}")
        public  ResponseEntity<?> salvar (@PathVariable Long id, @RequestBody Produto produto){
            var produtoBanco = produtoRepository.findById(id).orElse(null);

            if (produtoBanco != null) {
                produtoBanco.setNome(produto.getNome());
                produtoBanco.setSKU(produto.getSKU());
                produtoBanco.setEstoque(produto.getEstoque());
                produtoBanco.setPreco(produto.getPreco());
                return ResponseEntity.ok("Atualizado com sucesso");
            }

            return ResponseEntity.notFound().build();
        }
}
