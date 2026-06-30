import axios from "axios";
import { Fornecedor } from "../types/fornecedores";

export async function buscarDadosPorCnpj(cnpj: string): Promise<Partial<Fornecedor> | null> {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    
    // Validação básica de tamanho (CNPJ deve ter 14 dígitos)
    if (cnpjLimpo.length !== 14) {
        console.warn("CNPJ inválido: deve conter 14 dígitos.");
        return null;
    }

    try {
        const response = await axios.get(`https://api.opencnpj.org/${cnpjLimpo}`);
        
        if (response.status === 200 && response.data) {
            const dados = response.data;
            
            const fornecedorMapeado: Partial<Fornecedor> = {
                rzsocial: dados.razao_social || "",
                nomef: dados.nome_fantasia || "",
                cnpj: dados.cnpj || "",
                email: dados.email || "",
                status: "ATIVO" 
            };

            return fornecedorMapeado;
        }
    } catch (error) {
        console.error("Erro ao buscar dados na API OpenCNPJ:", error);
    }
    
    return null;
}