package com.senac.stockpro.backstockpro.controllers;

import com.senac.stockpro.backstockpro.model.entities.Movimentacao;
import com.senac.stockpro.backstockpro.model.repository.MovimentacaoRepository;
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
    private MovimentacaoRepository movimentacaoRepository;

    @GetMapping
    @Operation(description = "Realiza uma listagem de todas as movimentações no banco", summary = "Listagem todas")
    public ResponseEntity<List<?>> listarTodos(){
        return ResponseEntity.ok(movimentacaoRepository.findAllByOrderByIdAsc());
    }

    @PostMapping
    @Operation(description = "Registra uma nova movimentação no banco", summary = "Salvar movimentação")
    public ResponseEntity<Long> salvar(@RequestBody Movimentacao movimentacao){
        return ResponseEntity.ok(movimentacaoRepository.save(movimentacao).getId());
    }
}
