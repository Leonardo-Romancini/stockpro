'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Interface para o estado do slice
export interface FornecedorHistoricoState {
    recentes: number[];
}

const COOKIE_NAME = 'recentes_fornecedores';

// Recuperação inicial dos dados direto dos Cookies
const salvosRecover = Cookies.get(COOKIE_NAME);

const initialState: FornecedorHistoricoState = {
    // Se achar os ids, passa de string para array. Se não, inicia vazio.
    recentes: salvosRecover ? JSON.parse(salvosRecover) as number[] : []
};

//O initialState nessa parte é o que dá os dados para o state
const historicoSlice = createSlice({
    name: 'historico',
    initialState,
    reducers: {
        registrarUso: (state, action: PayloadAction<{ id: number }>) => {
            const idNovo = action.payload.id;

            // 1. Remove o id se ele já existir na lista (evita duplicatas)
            const filtrados = state.recentes.filter(item => item !== idNovo);

            // 2. Coloca o id novo na frente e limita aos 3 primeiros itens
            const novosRecentes = [idNovo, ...filtrados].slice(0, 3);

            // 3. Atualiza o estado do Redux
            state.recentes = novosRecentes;

            // 4. Salva a nova lista nos Cookies por 7 dias
            Cookies.set(COOKIE_NAME, JSON.stringify(novosRecentes), { expires: 7 });
        },
    }
});

export const { registrarUso } = historicoSlice.actions;
export default historicoSlice.reducer;