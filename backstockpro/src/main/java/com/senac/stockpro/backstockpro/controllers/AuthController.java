package com.senac.stockpro.backstockpro.controllers;

import com.senac.stockpro.backstockpro.model.DTO.LoginRequest;
import com.senac.stockpro.backstockpro.model.DTO.LoginResponse;
import com.senac.stockpro.backstockpro.model.repository.UsuarioRepository;
import com.senac.stockpro.backstockpro.services.TokenService;
import com.senac.stockpro.backstockpro.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Tag(description = "Serviço responsável por controlar a autenticação de usuários e sessão",name = "Serviço autenticação")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    @Operation(description = "Realiza a validação das credenciais do login e retorna um token", summary = "Login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){

        /*Provisório bichou*/
        if(usuarioService.ValidaUsuarioSenha(loginRequest)){

            var token = tokenService.gerarToken(loginRequest.email());

            return ResponseEntity.ok(new LoginResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
