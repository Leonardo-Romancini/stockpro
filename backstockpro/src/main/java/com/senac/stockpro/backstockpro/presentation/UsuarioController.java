package com.senac.stockpro.backstockpro.presentation;


import com.senac.stockpro.backstockpro.application.DTO.AlterarStatusUsuarioRequest;
import com.senac.stockpro.backstockpro.application.DTO.UsuarioRequest;
import com.senac.stockpro.backstockpro.application.DTO.UsuarioResponse;
import com.senac.stockpro.backstockpro.application.services.UsuarioService;
import com.senac.stockpro.backstockpro.domain.entities.Usuario;
import com.senac.stockpro.backstockpro.domain.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(description = "Serviço responsável por controlar a criação, listagem e edição de usuários",name = "Serviço usuário")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    @Operation(description = "Realiza uma listagem de todos os usuários no banco", summary = "Listagem todos")
    public ResponseEntity<List<UsuarioResponse>> listarTodos(){

        var usuarios = usuarioService.ListarTodos();

        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/usuariologado")
    @Operation(description = "Busca usuário da sessão",summary = "Consulta usuário logado")
    public ResponseEntity<Usuario> buscarUsuarioLogado(Authentication authentication){
        Usuario usuario = (Usuario) authentication.getPrincipal();
        return ResponseEntity.ok(usuarioRepository.findById(usuario.getId()).orElse(null));
    }

    @GetMapping("/{id}")
    @Operation(description = "Realiza uma busca de um usuário através de seu ID", summary = "Listar usuário")
    public ResponseEntity<UsuarioResponse> buscarPorId(@PathVariable Long id) {

        return ResponseEntity.ok(usuarioService.BuscarUsuarioPorId(id));
    }

    @PostMapping
    @Operation(description = "Registra um novo usuário no banco", summary = "Salvar usuário")
    public ResponseEntity<Long> salvar(@RequestBody UsuarioRequest usuario){
        return ResponseEntity.ok(usuarioService.SalvarUsuario(usuario));
    }

    @PutMapping("/{id}")
    @Operation(description = "Registra a edição de um usuário através de seu ID", summary = "Editar usuário")
    public  ResponseEntity<?> salvar (@PathVariable Long id, @RequestBody Usuario usuario){
       var alterarUsuarioResult = usuarioService.AlterarUsuario(id, usuario);

        return alterarUsuarioResult ? ResponseEntity.ok("Atualizado com sucesso") : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatus")
    @Operation(description = "Realiza a alteração do status do usuário para ATIVO ou INATIVO", summary = "Altera status")
    public ResponseEntity<?> AlterarStatus(@PathVariable Long id, @RequestBody AlterarStatusUsuarioRequest statusRequest){

        var alterarStatus = usuarioService.AlterarStatus(statusRequest, id);

        return alterarStatus ? ResponseEntity.ok("Status atualizado com sucesso.") : ResponseEntity.notFound().build();
    }
}
