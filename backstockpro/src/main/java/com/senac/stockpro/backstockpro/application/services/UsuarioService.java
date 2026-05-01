package com.senac.stockpro.backstockpro.application.services;

import com.senac.stockpro.backstockpro.application.DTO.AlterarStatusUsuarioRequest;
import com.senac.stockpro.backstockpro.application.DTO.LoginRequest;
import com.senac.stockpro.backstockpro.application.DTO.UsuarioRequest;
import com.senac.stockpro.backstockpro.application.DTO.UsuarioResponse;
import com.senac.stockpro.backstockpro.domain.entities.Usuario;
import com.senac.stockpro.backstockpro.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

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

    public boolean AlterarUsuario(Long id, Usuario usuario) {

        try {
            var usuarioBanco = usuarioRepository.findById(id).orElse(null);
            if (usuarioBanco != null) {
                usuarioBanco.setEmail(usuario.getEmail());
                usuarioBanco.setNome(usuario.getNome());
                usuarioBanco.setSenha(usuario.getSenha());
                usuarioBanco.setStatus(usuario.getStatus());
                usuarioBanco.setCnpj(usuario.getCnpj());
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
}
