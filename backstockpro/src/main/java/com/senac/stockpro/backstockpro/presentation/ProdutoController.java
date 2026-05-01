package com.senac.stockpro.backstockpro.presentation;

import com.senac.stockpro.backstockpro.application.DTO.AlterarStatusProdutoRequest;
import com.senac.stockpro.backstockpro.application.services.ProdutoService;
import com.senac.stockpro.backstockpro.domain.entities.Produto;
import com.senac.stockpro.backstockpro.domain.repository.ProdutoRepository;

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

        @Autowired
        private ProdutoService produtoService;

        @GetMapping
        @Operation(description = "Realiza uma listagem de todos os produtos no banco", summary = "Listagem todos")
        public ResponseEntity<List<?>> listarTodos(){

            var produtos = produtoService.ListarTodos();

            return ResponseEntity.ok(produtos);
        }

        @GetMapping("/{id}")
        @Operation(description = "Realiza uma busca de um produto através de seu ID", summary = "Listar produto")
        public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
            return ResponseEntity.ok(produtoService.BuscarProdutoPorId(id));
        }

        @PostMapping
        @Operation(description = "Registra um novo produto no banco", summary = "Salvar produto")
        public ResponseEntity<Long> salvar(@RequestBody Produto produto){
            return ResponseEntity.ok(produtoRepository.save(produto).getId());
        }

        @PutMapping("/{id}")
        @Operation(description = "Registra a edição de um produto através de seu ID", summary = "Editar produto")
        public  ResponseEntity<?> editar (@PathVariable Long id, @RequestBody Produto produto){

            var alterarProdutoResult = produtoService.AlterarProduto(id, produto);

            return alterarProdutoResult ? ResponseEntity.ok("Atualizado com sucesso") : ResponseEntity.notFound().build();
        }

    @PutMapping("/{id}/AlterarStatus")
    @Operation(description = "Realiza a alteração do status do produto para ATIVO ou INATIVO", summary = "Altera status")
    public ResponseEntity<?> AlterarStatus(@PathVariable Long id, @RequestBody AlterarStatusProdutoRequest statusRequest){
        var alterarStatus = produtoService.AlterarStatus(statusRequest, id);

        return alterarStatus ? ResponseEntity.ok("Status atualizado com sucesso.") : ResponseEntity.notFound().build();
    }
}
