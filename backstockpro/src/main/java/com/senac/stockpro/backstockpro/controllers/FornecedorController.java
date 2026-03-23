package com.senac.stockpro.backstockpro.controllers;

import com.senac.stockpro.backstockpro.model.entities.Fornecedor;
import com.senac.stockpro.backstockpro.model.entities.Usuario;
import com.senac.stockpro.backstockpro.model.repository.FornecedorRepository;
import com.senac.stockpro.backstockpro.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fornecedores")
public class FornecedorController {

    @Autowired
    private FornecedorRepository fornecedorRepository;

    @GetMapping
    public ResponseEntity<List<?>> listarTodos(){
        return ResponseEntity.ok(fornecedorRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fornecedor> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(fornecedorRepository.findById(id).orElse(null));
    }

    @PostMapping
    public ResponseEntity<Long> salvar(@RequestBody Fornecedor fornecedor){
        return ResponseEntity.ok(fornecedorRepository.save(fornecedor).getId());
    }

    @PutMapping("/{id}")
    public  ResponseEntity<?> salvar (@PathVariable Long id, @RequestBody Fornecedor fornecedor){
        var fornecedorBanco = fornecedorRepository.findById(id).orElse(null);

        if (fornecedorBanco != null) {
            fornecedorBanco.setRzsocial(fornecedor.getRzsocial());
            fornecedorBanco.setNomef(fornecedor.getNomef());
            fornecedorBanco.setCnpj(fornecedor.getCnpj());
            fornecedorBanco.setEmail(fornecedor.getEmail());
            fornecedorBanco.setStatus(fornecedor.getStatus());
            return ResponseEntity.ok("Atualizado com sucesso");
        }

        return ResponseEntity.notFound().build();
    }
}
