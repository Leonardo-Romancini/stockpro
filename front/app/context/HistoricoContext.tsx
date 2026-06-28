'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface FornecedorHistoricoContextType {
    recentes: number[];
    registrarUso: (id: number) => void;
}

const FornecedorHistoricoContext = createContext<FornecedorHistoricoContextType | undefined>(undefined);


//facilitador para não ter que ficar reescrevendo o nome
const COOKIE_NAME = 'recentes_fornecedores';

export function FornecedorHistoricoProvider({ children }: { children: React.ReactNode }) {
    const [recentes, setRecentes] = useState<number[]>([]);

    useEffect(() => {
        //pega os ids
        const salvos = Cookies.get(COOKIE_NAME);
        if (salvos) {
            try {
                //se achar os ids ele os passa de string para array para o js poder entender
                setRecentes(JSON.parse(salvos));
            } catch (e) {
                console.error("Erro ao ler cookies de fornecedores", e);
            }
        }
    }, []);

    const registrarUso = (id: number) => {
        setRecentes(prev => {

            //remove o id que for usado da lista para que ele não apareça várias vezes nos recentes
            const filtrados = prev.filter(item => item !== id);

            //bota o id novo na frente do array e arrasta os antigos para trás com o slice servindo para manter o limite de 3
            const novosRecentes = [id, ...filtrados].slice(0, 3);
            
            Cookies.set(COOKIE_NAME, JSON.stringify(novosRecentes), { expires: 7 });
            
            return novosRecentes;
        });
    };

    return (
        <FornecedorHistoricoContext.Provider value={{ recentes, registrarUso }}>
            {children}
        </FornecedorHistoricoContext.Provider>
    );
}

export const useFornecedorHistorico = () => {
    const context = useContext(FornecedorHistoricoContext);
    if (!context) throw new Error("useFornecedorHistorico deve ser usado dentro do Provider");
    return context;
};