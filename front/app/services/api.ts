import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//Response que dá o logout e leva para a tela de login quando token expira
api.interceptors.response.use(
    (response) => response, 
    (error) => {
        const status = error.response?.status;
        
        if (status === 401 || status === 403) {
            console.warn("Sessão expirada ou acesso negado. Realizando logout...");
            
            store.dispatch(logout());
            window.location.href = '/login';
        }
        
        return Promise.reject(error);
    }
);

export default api;