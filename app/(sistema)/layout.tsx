'use client'
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function SistemaLayout({ children }: { children: React.ReactNode }) {

    const{usuario} = useAuth();
    const router = useRouter();

    useEffect(()=>{
        debugger;
        if (usuario == null){
            router.push("/login")
        }
    })

    if(usuario ==  null)return;

    return (
  <div className="flex min-h-screen w-full bg-slate-50">
    {/* 1. Sidebar agora ocupa o espaço de 256px (w-64) na esquerda */}
    <Sidebar />

    {/* 2. Este container ocupa TODO o resto da largura (flex-1) */}
    <div className="flex flex-col flex-1 min-w-0"> 
      
      {/* O Header agora começa onde a Sidebar termina */}
      <Header />

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  </div>
);
}