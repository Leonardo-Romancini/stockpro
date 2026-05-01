package com.senac.stockpro.backstockpro.application.services;

import com.senac.stockpro.backstockpro.domain.repository.FornecedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FornecedorService {

    @Autowired
    private FornecedorRepository fornecedorRepository;

}
