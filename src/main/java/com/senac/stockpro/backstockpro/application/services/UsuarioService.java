package com.senac.stockpro.backstockpro.application.services;

import com.senac.stockpro.backstockpro.application.DTO.*;
import com.senac.stockpro.backstockpro.domain.entities.Usuario;
import com.senac.stockpro.backstockpro.domain.repository.UsuarioRepository;
import com.senac.stockpro.backstockpro.domain.valueobjects.CNPJ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Value("${spring.secretkey}")
    private String secret;

    public UsuarioResponse BuscarUsuarioPorId(Long id) {
       try {
           var usuario = usuarioRepository.findById(id).orElse(null);
           return new UsuarioResponse(usuario);
       } catch (Exception e) {
           throw new RuntimeException(e);
       }
    }

    public boolean ValidaUsuarioSenha(LoginRequest loginRequest){

        try {
            return usuarioRepository.existsUsuarioByEmailContainingAndSenha(loginRequest.email(), loginRequest.senha());
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public List<UsuarioResponse> ListarTodos() {
        try{
            return usuarioRepository.findAllByOrderByIdAsc()
                    .stream()
                    .map(UsuarioResponse::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean AlterarUsuario(Long id, UsuarioRequest usuario) {

        try {
            var usuarioBanco = usuarioRepository.findById(id).orElse(null);
            if (usuarioBanco != null) {
                usuarioBanco.setEmail(usuario.email());
                usuarioBanco.setNome(usuario.nome());
                usuarioBanco.setSenha(usuario.senha());
                usuarioBanco.setCnpj(new CNPJ(usuario.cnpj()));
                usuarioRepository.save(usuarioBanco);
               return true;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return false;
    }

    public boolean AlterarStatus(AlterarStatusUsuarioRequest statusRequest, Long id) {
        try {
            var usuarioBanco = usuarioRepository.findById(id).orElse(null);
            if (usuarioBanco != null) {
                usuarioBanco.setStatus(statusRequest.status());
                usuarioRepository.save(usuarioBanco);
                return true;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return false;
    }

    public Long SalvarUsuario(UsuarioRequest usuario) {
        try {
            return usuarioRepository.save(new Usuario(usuario)).getId();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long SalvarUsuarioAdm(UsuarioAdmRequest usuario) {
        try {
            if (usuario.secretKey().equals(secret)){
                return usuarioRepository.save(new Usuario(usuario)).getId();
            } else {
                return 0L;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public UsuarioResponse BuscarUsuarioLogado(Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        try{
            return  usuarioRepository.findById(usuario.getId())
                    .stream().map(UsuarioResponse::new).findFirst().orElse(null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
