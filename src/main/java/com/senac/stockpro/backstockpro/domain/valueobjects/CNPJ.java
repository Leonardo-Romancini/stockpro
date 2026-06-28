package com.senac.stockpro.backstockpro.domain.valueobjects;

public class CNPJ {

    private String cnpj;

    //necessário pára a construção do hibernate funcionar
    public CNPJ(){
        this.cnpj = "";
    }

    public CNPJ(String cnpj) {
        if(cnpj == null || !isValid(cnpj)){
            throw new IllegalArgumentException("CNPJ Inválido!");
        }

        this.cnpj = cnpj;
    }

    private boolean isValid(String cnpj){

        String cnpjTratado = cnpj.replaceAll("[^0-9]","");

        //mudar para validar CNPJ
        if(cnpjTratado.length()!=14 || cnpjTratado.matches("(\\d)\\1{13}")){
            return false;
        }
        return validarDigitosVerificadores(cnpj);
    }

    private boolean validarDigitosVerificadores(String cnpj){
        String numeros = cnpj.replaceAll("[^0-9]", "");

        // --- Cálculo do 1º Dígito Verificador ---
        int[] pesos1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
        int soma1 = 0;
        for (int i = 0; i < 12; i++) {
            soma1 += Character.getNumericValue(numeros.charAt(i)) * pesos1[i];
        }
        int resto1 = soma1 % 11;
        int digito1 = (resto1 < 2) ? 0 : 11 - resto1;

        // --- Cálculo do 2º Dígito Verificador ---
        int[] pesos2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
        int soma2 = 0;
        for (int i = 0; i < 13; i++) {
            soma2 += Character.getNumericValue(numeros.charAt(i)) * pesos2[i];
        }
        int resto2 = soma2 % 11;
        int digito2 = (resto2 < 2) ? 0 : 11 - resto2;

        // Captura os dígitos originais informados para comparação
        int dv1 = Character.getNumericValue(numeros.charAt(12));
        int dv2 = Character.getNumericValue(numeros.charAt(13));

        return (digito1 == dv1 && digito2 == dv2);
    }

    private String getNumeros(){
        //A expressão regex com ^ exclui valores de serem incluídos em determinada função
        return this.cnpj.replaceAll("[^0-9]","");
    }

    @Override
    public String toString(){
        if (this.cnpj == null || this.cnpj.length() != 14) {
            return this.cnpj;
        }

        return String.format("%s.%s.%s/%s-%s",
                this.cnpj.substring(0, 2),
                this.cnpj.substring(2, 5),
                this.cnpj.substring(5, 8),
                this.cnpj.substring(8, 12),
                this.cnpj.substring(12, 14)
        );
    }

}
