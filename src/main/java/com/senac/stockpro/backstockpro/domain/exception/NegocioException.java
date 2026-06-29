package com.senac.stockpro.backstockpro.domain.exception;

//Para evitar logout devido uma requisição falhar por algo além do token
public class NegocioException extends RuntimeException {
    public NegocioException(String mensagem) {
        super(mensagem);
    }
}
