package com.senac.stockpro.backstockpro.services;

import com.senac.stockpro.backstockpro.model.DTO.AlterarStatusUsuarioRequest;
import com.senac.stockpro.backstockpro.model.DTO.LoginRequest;
import com.senac.stockpro.backstockpro.model.entities.Usuario;
import com.senac.stockpro.backstockpro.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario BuscarUsuarioPorId(Long id) {
       try {
          return  usuarioRepository.findById(id).orElse(null);
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

    public List<Usuario> ListarTodos() {
        try{
            return usuarioRepository.findAllByOrderByIdAsc();
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
}
