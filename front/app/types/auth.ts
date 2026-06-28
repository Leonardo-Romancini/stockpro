import { Usuario } from "./usuarios";

export interface LoginResponse{
  token: string,
  role: string
}

//foi criado agora para ser usado no authservice
export interface LoginRequest{
    email: string,
    senha: string
}

export interface AuthState {
    usuario: Usuario | null; 
    token: string;
}