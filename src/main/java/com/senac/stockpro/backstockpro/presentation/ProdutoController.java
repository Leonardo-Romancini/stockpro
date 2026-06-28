package com.senac.stockpro.backstockpro.presentation;

import com.senac.stockpro.backstockpro.application.DTO.AlterarStatusProdutoRequest;
import com.senac.stockpro.backstockpro.application.DTO.EstatisticaProdutoResponse;
import com.senac.stockpro.backstockpro.application.DTO.ProdutoRequest;
import com.senac.stockpro.backstockpro.application.DTO.ProdutoResponse;
import com.senac.stockpro.backstockpro.application.services.ProdutoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@Tag(description = "Serviço responsável por controlar a criação, listagem e edição de produtos", name = "Serviço produto")
public class ProdutoController {


    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    @Operation(description = "Realiza uma listagem de todos os produtos do usuário no banco", summary = "Listagem todos")
    public ResponseEntity<List<ProdutoResponse>> listarTodos() {

        var produtos = produtoService.ListarTodos();

        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    @Operation(description = "Realiza uma busca de um produto do usuário através de seu ID", summary = "Listar produto")
    public ResponseEntity<ProdutoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(produtoService.BuscarProdutoPorId(id));
    }

    @PostMapping
    @Operation(description = "Registra um novo produto no banco", summary = "Salvar produto")
    public ResponseEntity<Long> salvar(@RequestBody ProdutoRequest produto) {
        return ResponseEntity.ok(produtoService.SalvarProduto(produto));
    }

    @PutMapping("/{id}")
    @Operation(description = "Registra a edição de um produto através de seu ID", summary = "Editar produto")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody ProdutoRequest produto) {

        var alterarProdutoResult = produtoService.AlterarProduto(id, produto);

        return alterarProdutoResult ? ResponseEntity.ok("Atualizado com sucesso") : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatus")
    @Operation(description = "Realiza a alteração do status do produto para ATIVO ou INATIVO", summary = "Altera status")
    public ResponseEntity<?> AlterarStatus(@PathVariable Long id, @RequestBody AlterarStatusProdutoRequest statusRequest) {
        var alterarStatus = produtoService.AlterarStatus(statusRequest, id);

        return alterarStatus ? ResponseEntity.ok("Status atualizado com sucesso.") : ResponseEntity.notFound().build();
    }

    @GetMapping("/estatisticas")
    @Operation(description = "Retorna o total de produtos e a quantidade em estoque crítico", summary = "Estatisticas de produtos")
    public ResponseEntity<EstatisticaProdutoResponse> obterEstatisticas() {
        return ResponseEntity.ok(produtoService.obterEstatisticasProduto());
    }
}
