package com.senac.stockpro.backstockpro.controllers;


import com.senac.stockpro.backstockpro.model.DTO.AlterarStatusUsuarioRequest;
import com.senac.stockpro.backstockpro.model.entities.Usuario;
import com.senac.stockpro.backstockpro.model.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(description = "Serviço responsável por controlar a criação, listagem e edição de usuários",name = "Serviço usuário")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    @Operation(description = "Realiza uma listagem de todos os usuários no banco", summary = "Listagem todos")
    public ResponseEntity<List<?>> listarTodos(){
        return ResponseEntity.ok(usuarioRepository.findAllByOrderByIdAsc());
    }

    @GetMapping("/{id}")
    @Operation(description = "Realiza uma busca de um usuário através de seu ID", summary = "Listar usuário")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioRepository.findById(id).orElse(null));
    }

    @PostMapping
    @Operation(description = "Registra um novo usuário no banco", summary = "Salvar usuário")
    public ResponseEntity<Long> salvar(@RequestBody Usuario usuario){
        return ResponseEntity.ok(usuarioRepository.save(usuario).getId());
    }

    @PutMapping("/{id}")
    @Operation(description = "Registra a edição de um usuário através de seu ID", summary = "Editar usuário")
    public  ResponseEntity<?> salvar (@PathVariable Long id, @RequestBody Usuario usuario){
        var usuarioBanco = usuarioRepository.findById(id).orElse(null);

        if (usuarioBanco != null) {
            usuarioBanco.setEmail(usuario.getEmail());
            usuarioBanco.setNome(usuario.getNome());
            usuarioBanco.setSenha(usuario.getSenha());
            usuarioBanco.setStatus(usuario.getStatus());
            usuarioBanco.setCnpj(usuario.getCnpj());
            return ResponseEntity.ok("Atualizado com sucesso");
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatus")
    @Operation(description = "Realiza a alteração do status do usuário para ATIVO ou INATIVO", summary = "Altera status")
    public ResponseEntity<?> AlterarStatus(@PathVariable Long id, @RequestBody AlterarStatusUsuarioRequest statusRequest){
        var usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco != null) {
            usuarioBanco.setStatus(statusRequest.status());
            usuarioRepository.save(usuarioBanco);

            return ResponseEntity.ok("Atualizado com sucesso");
        }
        return ResponseEntity.notFound().build();
    }
}
