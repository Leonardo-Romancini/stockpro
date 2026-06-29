package com.senac.stockpro.backstockpro.presentation;

import com.senac.stockpro.backstockpro.application.DTO.*;
import com.senac.stockpro.backstockpro.application.services.FornecedorService;
import com.senac.stockpro.backstockpro.domain.exception.NegocioException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fornecedores")
@Tag(description = "Serviço responsável por controlar a criação, listagem e edição de fornecedores",name = "Serviço fornecedor")
public class
FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping
    @Operation(description = "Realiza uma listagem de todos os fornecedores do usuário no banco", summary = "Listagem todos")
    public ResponseEntity<List<FornecedorResponse>> listarTodos(){
        var fornecedores = fornecedorService.ListarTodos();
        return ResponseEntity.ok(fornecedores);
    }

    @GetMapping("/{id}")
    @Operation(description = "Realiza uma busca de um fornecedor do usuário através de seu ID", summary = "Listar fornecedor")
    public ResponseEntity<FornecedorResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(fornecedorService.BuscarFornecedorPorId(id));
    }

    //alterado para evitar o logout por errar um campo
    @PostMapping
    @Operation(description = "Registra um novo fornecedor no banco", summary = "Salvar fornecedor")
    public ResponseEntity<?> salvar(@RequestBody FornecedorRequest fornecedor) {
        try {
            Long id = fornecedorService.SalvarFornecedor(fornecedor);
            return ResponseEntity.ok(id);
        } catch (NegocioException e) {
            // Retorna 422 para erros de regra de negócio
            return ResponseEntity.status(422).body(e.getMessage());
        } catch (Exception e) {
            // Retorna 500 para erros inesperados
            return ResponseEntity.internalServerError().body("Erro interno: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @Operation(description = "Registra a edição de um fornecedor através de seu ID", summary = "Editar fornecedor")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody FornecedorRequest fornecedor) {
        try {
            fornecedorService.AlterarFornecedor(id, fornecedor);
            return ResponseEntity.ok("Atualizado com sucesso");
        } catch (NegocioException e) {
            // Se a mensagem contiver "não encontrado", retorna 404, senão 422
            if (e.getMessage().contains("não encontrado")) {
                return ResponseEntity.status(404).body(e.getMessage());
            }
            return ResponseEntity.status(422).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro inesperado ao atualizar fornecedor.");
        }
    }

    @PutMapping("/{id}/AlterarStatus")
    @Operation(description = "Realiza a alteração do status do fornecedor para ATIVO ou INATIVO", summary = "Altera status")
    public ResponseEntity<?> AlterarStatus(@PathVariable Long id, @RequestBody AlterarStatusFornecedorRequest statusRequest){
        var alterarStatus = fornecedorService.AlterarStatus(statusRequest, id);

        return alterarStatus ? ResponseEntity.ok("Status atualizado com sucesso.") : ResponseEntity.notFound().build();
    }

    @PostMapping("/desk")
    @Operation(description = "Registra um novo fornecedor no banco via desk", summary = "Salvar fornecedor desk")
    public ResponseEntity<Long> salvarDesk(@RequestBody FornecedorDeskRequest fornecedor){
        return ResponseEntity.ok(fornecedorService.SalvarFornecedorDesk(fornecedor));
    }

    @GetMapping("/estatisticas")
    @Operation(description = "Retorna a contagem de fornecedores (Total para Admin, ou por usuário)", summary = "Contar fornecedores")
    public ResponseEntity<EstatisticaFornecedorResponse> contarFornecedores() {
        EstatisticaFornecedorResponse resposta = fornecedorService.contarFornecedores();
        return ResponseEntity.ok(resposta);
    }
}
