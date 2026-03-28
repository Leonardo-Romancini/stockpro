'use client'

import axios from "axios";
import { table } from "console";
import Link from "next/link";
import { useEffect, useState } from "react"

interface ListasProps {
  endpoint: string;
  editarHref?: string;
  mostrarAcoes: boolean;
}
export default function Listas({ endpoint, mostrarAcoes = false, editarHref }: ListasProps) {
  const [lista, setLista] = useState<any[]>([]);
  // const [carregando, setCarregando] = useState(true);

    useEffect(() => {
    buscarDados(); 
  }, [endpoint]);

  const buscarDados = async () => {
    try {
      //setCarregando (true);
      const resposta = await axios.get(endpoint);
      setLista(resposta.data);

      if (resposta.status !== 200) {
        alert("Erro ao carregar dados!")
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handlerAlterarStatus = async (item: any) => {
    const novoStatusValue = item.status === "ATIVO" ? "INATIVO" : "ATIVO";
    const statusNovo = { status: novoStatusValue };

    await axios.patch(`${endpoint}/${item.id}`, statusNovo);

    buscarDados();
  };

  //é o que pega o nome das colunas com o Object.keys sendo o responsável por isso, o [0] em lista é necessário para não retornar os indices ao invés dos nomes
  const colunas = lista.length > 0 ? Object.keys(lista[0]) : []

  //os placeholder pra quando tá carregando
  //if (carregando) return <div>Carregando dados...</div>;
  if (lista.length === 0) return <div>Nenhum registro encontrado.</div>;

  return (
  <table>
    <thead>
      <tr>
        {colunas.map((col) => (
          <th key={col}>{col}</th>
        ))}
        {mostrarAcoes && <th>Ações</th>}
      </tr>
    </thead>
    <tbody>
      {lista.map((item) => (
        <tr key={item.id}>
          {colunas.map((col) => (
            <td key={col}>{String(item[col])}</td>
          ))}

          {mostrarAcoes && (
            <td>
              <Link href={`${editarHref}/${item.id}/editar`}>
                Editar
              </Link>
              <button onClick={() => handlerAlterarStatus(item)}>
                {item.status === 'ATIVO' ? 'Desativar' : 'Ativar'}
              </button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);
}