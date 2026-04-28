package com.senac.stockpro.backstockpro.controllers;

import com.senac.stockpro.backstockpro.model.DTO.AlterarStatusFornecedorRequest;
import com.senac.stockpro.backstockpro.model.entities.Fornecedor;
import com.senac.stockpro.backstockpro.model.repository.FornecedorRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fornecedores")
@Tag(description = "Serviço responsável por controlar a criação, listagem e edição de fornecedores",name = "Serviço fornecedor")
public class FornecedorController {

    @Autowired
    private FornecedorRepository fornecedorRepository;

    @GetMapping
    @Operation(description = "Realiza uma listagem de todos os fornecedores no banco", summary = "Listagem todos")
    public ResponseEntity<List<?>> listarTodos(){
        return ResponseEntity.ok(fornecedorRepository.findAllByOrderByIdAsc());
    }

    @GetMapping("/{id}")
    @Operation(description = "Realiza uma busca de um fornecedor através de seu ID", summary = "Listar fornecedor")
    public ResponseEntity<Fornecedor> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(fornecedorRepository.findById(id).orElse(null));
    }

    @PostMapping
    @Operation(description = "Registra um novo fornecedor no banco", summary = "Salvar fornecedor")
    public ResponseEntity<Long> salvar(@RequestBody Fornecedor fornecedor){
        return ResponseEntity.ok(fornecedorRepository.save(fornecedor).getId());
    }

    @PutMapping("/{id}")
    @Operation(description = "Registra a edição de um fornecedor através de seu ID", summary = "Editar fornecedor")
    public  ResponseEntity<?> salvar (@PathVariable Long id, @RequestBody Fornecedor fornecedor){
        var fornecedorBanco = fornecedorRepository.findById(id).orElse(null);

        if (fornecedorBanco != null) {
            fornecedorBanco.setRzsocial(fornecedor.getRzsocial());
            fornecedorBanco.setNomef(fornecedor.getNomef());
            fornecedorBanco.setCnpj(fornecedor.getCnpj());
            fornecedorBanco.setEmail(fornecedor.getEmail());
            fornecedorBanco.setStatus(fornecedor.getStatus());
            fornecedorRepository.save(fornecedorBanco);
            return ResponseEntity.ok("Atualizado com sucesso");
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatus")
    @Operation(description = "Realiza a alteração do status do fornecedor para ATIVO ou INATIVO", summary = "Altera status")
    public ResponseEntity<?> AlterarStatus(@PathVariable Long id, @RequestBody AlterarStatusFornecedorRequest statusRequest){
        var fornecedorBanco = fornecedorRepository.findById(id).orElse(null);
        if (fornecedorBanco != null) {
            fornecedorBanco.setStatus(statusRequest.status());
            fornecedorRepository.save(fornecedorBanco);

            return ResponseEntity.ok("Atualizado com sucesso");
        }
        return ResponseEntity.notFound().build();
    }
}
