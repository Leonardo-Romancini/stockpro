package com.senac.stockpro.backstockpro.controllers;

import com.senac.stockpro.backstockpro.model.DTO.LoginRequest;
import com.senac.stockpro.backstockpro.model.DTO.LoginResponse;
import com.senac.stockpro.backstockpro.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){

        /*Provisório bichou*/
        if(loginRequest.email().equals("String@s") && loginRequest.senha().equals("String")){
            return ResponseEntity.ok(new LoginResponse("LMAOXDHAHAHAHAHAHAHAHAHAH"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
