'use client'

import axios from "axios";
import { table } from "console";
import Link from "next/link";
import { useEffect, useState } from "react"

interface ListasProps {
  dados: any[];
  editarHref?: string;
  mostrarAcoes: boolean;
  onAlterarStatus: (item: any) => void;
}
export default function Listas({ dados, onAlterarStatus, mostrarAcoes = false, editarHref }: ListasProps) {


  //é o que pega o nome das colunas com o Object.keys sendo o responsável por isso, o [0] em lista é necessário para não retornar os indices ao invés dos nomes
  const colunas = dados.length > 0 ? Object.keys(dados[0]) : []

  //os placeholder pra quando tá carregando
  //if (carregando) return <div>Carregando dados...</div>;
  if (dados.length === 0) return <div>Nenhum registro encontrado.</div>;

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
        {dados.map((item) => (
          <tr key={item.id}>
            {colunas.map((col) => (
              <td key={col}>{String(item[col])}</td>
            ))}

            {mostrarAcoes && (
              <td>
                <Link href={`${editarHref}/${item.id}/editar`}>
                  Editar
                </Link>
                <button onClick={() => onAlterarStatus?.(item)}>
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