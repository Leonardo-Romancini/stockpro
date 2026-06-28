'use client'

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import historicoReducer from "./slices/historicoSlice"
import produtoHistoricoReducer from "./slices/produtoHistoricoSlice";


export const store = configureStore({
    reducer:{
        auth: authReducer,
        fornecedorHistorico: historicoReducer,
        produtoHistorico: produtoHistoricoReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;