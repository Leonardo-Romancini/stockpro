package com.senac.stockpro.backstockpro.application.services;

import com.senac.stockpro.backstockpro.application.DTO.*;
import com.senac.stockpro.backstockpro.domain.entities.Fornecedor;
import com.senac.stockpro.backstockpro.domain.entities.Usuario;
import com.senac.stockpro.backstockpro.domain.repository.FornecedorRepository;
import com.senac.stockpro.backstockpro.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FornecedorService {

    @Autowired
    private FornecedorRepository fornecedorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Value("${spring.secretkey}")
    private String secret;

    public List<FornecedorResponse> ListarTodos() {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            List<Fornecedor> lista;

            if ("ROLE_ADMIN".equals(usuarioLogado.getRole())) {
                lista = fornecedorRepository.findAllByOrderByIdAsc();
            } else {
                lista = fornecedorRepository.getFornecedoresByUsuario_IdOrderByIdAsc(usuarioLogado.getId());
            }

            return lista.stream()
                    .map(FornecedorResponse::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar lista de fornecedores", e);
        }
    }


    public FornecedorResponse BuscarFornecedorPorId(Long id) {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Fornecedor fornecedor;

            if ("ROLE_ADMIN".equals(usuarioLogado.getRole())) {
                fornecedor = fornecedorRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));
            } else {
                fornecedor = fornecedorRepository.findByIdAndUsuario_Id(id, usuarioLogado.getId())
                        .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado ou acesso negado"));
            }

            return new FornecedorResponse(fornecedor);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar fornecedor: " + e.getMessage());
        }
    }

    public boolean AlterarStatus(AlterarStatusFornecedorRequest statusRequest, Long id) {
        try {
            var fornecedorBanco = fornecedorRepository.findById(id).orElse(null);
            if (fornecedorBanco != null) {
                fornecedorBanco.setStatus(statusRequest.status());
                fornecedorRepository.save(fornecedorBanco);
                return true;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return false;
    }

    public boolean AlterarFornecedor(Long id, FornecedorRequest fornecedor) {

        try {
            var fornecedorBanco = fornecedorRepository.findById(id).orElse(null);
            if (fornecedorBanco != null) {
                fornecedorBanco.setRzsocial(fornecedor.rzsocial());
                fornecedorBanco.setNomef(fornecedor.nomef());
                fornecedorBanco.setCnpj(fornecedor.cnpj());
                fornecedorBanco.setEmail(fornecedor.email());
                fornecedorRepository.save(fornecedorBanco);
                return true;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return false;
    }

    public Long SalvarFornecedor(FornecedorRequest fornecedor) {
        try {
            Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            Fornecedor novoFornecedor = new Fornecedor(fornecedor);

            if (usuarioLogado != null && usuarioLogado.getId() != null) {
                Usuario usuario = usuarioRepository.findById(usuarioLogado.getId())
                        .orElseThrow(() -> new RuntimeException("Usuário logado não encontrado!"));
                novoFornecedor.setUsuario(usuario);
            } else {
                throw new RuntimeException("Usuário não está autenticado corretamente!");
            }
            return fornecedorRepository.save(novoFornecedor).getId();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long SalvarFornecedorDesk(FornecedorDeskRequest fornecedor) {
        try {
            if(fornecedor.secretKey().equals(secret)){
                Fornecedor novoFornecedor = new Fornecedor(fornecedor);

                if (fornecedor.usuarioId() != null) {
                    var usuario = usuarioRepository.findById(fornecedor.usuarioId())
                            .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o ID: " + fornecedor.usuarioId()));
                    novoFornecedor.setUsuario(usuario);
                }

                return fornecedorRepository.save(novoFornecedor).getId();
            } else {
                return 0L;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public EstatisticaFornecedorResponse contarFornecedores() {
        Usuario usuarioLogado = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long total;

        if ("ROLE_ADMIN".equals(usuarioLogado.getRole())) {
            total = fornecedorRepository.count();
        } else {
            total = fornecedorRepository.countByUsuario_Id(usuarioLogado.getId());
        }

        return new EstatisticaFornecedorResponse(total);
    }

}
