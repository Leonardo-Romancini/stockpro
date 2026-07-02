'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface ProdutoHistoricoState {
    recentes: number[];
}

const COOKIE_NAME = 'recentes_produtos';

const salvosRecover = Cookies.get(COOKIE_NAME);

const initialState: ProdutoHistoricoState = {
    recentes: salvosRecover ? JSON.parse(salvosRecover) as number[] : []
};

const produtoHistoricoSlice = createSlice({
    name: 'produtoHistorico', 
    initialState,
    reducers: {
        registrarUsoProduto: (state, action: PayloadAction<{ id: number }>) => {
            const idNovo = action.payload.id;

            //Remove o id se já existir (evita duplicatas)
            const filtrados = state.recentes.filter(item => item !== idNovo);

            //Coloca na frente e limita às 3 últimas sugestões
            const novosRecentes = [idNovo, ...filtrados].slice(0, 3);

            state.recentes = novosRecentes;

            //Salva no cookie isolado de produtos
            Cookies.set(COOKIE_NAME, JSON.stringify(novosRecentes), { expires: 7 });
        },
    }
});

export const { registrarUsoProduto } = produtoHistoricoSlice.actions;
export default produtoHistoricoSlice.reducer;