package com.senac.stockpro.backstockpro.presentation;

import com.senac.stockpro.backstockpro.application.DTO.EstatisticaMovimentacaoResponse;
import com.senac.stockpro.backstockpro.application.DTO.MovimentacaoRequest;
import com.senac.stockpro.backstockpro.application.DTO.MovimentacaoResponse;
import com.senac.stockpro.backstockpro.application.services.MovimentacaoService;
import com.senac.stockpro.backstockpro.domain.exception.NegocioException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movimentacoes")
@Tag(description = "Serviço responsável por controlar a criação e listagem das movimentações",name = "Serviço movimentação")
public class MovimentacaoController {

    @Autowired
    private MovimentacaoService movimentacaoService;

    @GetMapping
    @Operation(description = "Realiza uma listagem de todas as movimentações do usuário no banco", summary = "Listagem todas")
    public ResponseEntity<List<?>> listarTodos(){
        return ResponseEntity.ok(movimentacaoService.ListarTodos());
    }

    @PostMapping
    @Operation(description = "Registra uma nova movimentação no banco", summary = "Salvar movimentação")
    public ResponseEntity<?> salvar(@RequestBody MovimentacaoRequest movimentacao) {
        try {
            return ResponseEntity.ok(movimentacaoService.SalvarMovimentacao(movimentacao));
        } catch (NegocioException e) {
            return ResponseEntity.status(422).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro inesperado: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @Operation(description = "Realiza uma busca de uma movimentação através de seu ID", summary = "Listar movimentação")
    public ResponseEntity<MovimentacaoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(movimentacaoService.BuscarMovimentacaoPorId(id));
    }

    @GetMapping("/pesquisa")
    @Operation(description = "Realiza uma busca de movimentações filtradas pelo nome do produto", summary = "Pesquisar movimentações")
    public ResponseEntity<List<MovimentacaoResponse>> pesquisar(@RequestParam String pesquisa) {
        return ResponseEntity.ok(movimentacaoService.PesquisarMovimentacao(pesquisa));
    }

    @GetMapping("/estatisticas")
    @Operation(description = "Retorna a contagem total de entradas e saídas", summary = "Estatisticas de movimentação")
    public ResponseEntity<EstatisticaMovimentacaoResponse> obterEstatisticas() {
        var estatisticas = movimentacaoService.obterEstatisticasMovimentacao();
        return ResponseEntity.ok(estatisticas);
    }
}
