"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ApiDados from '@/lib/apidados';
import { PlusCircleOutlined } from '@ant-design/icons';

const NOME_TABELA = 'modelo';             // nome da tabela
const LINK_DO_MODULO = `${NOME_TABELA}`;  // link da página (ex.: /modelo)

const API = new ApiDados(NOME_TABELA);    // acessa os dados da tabela


export default function Peso() {
  const [lista, setLista] = useState([]);


  // carrega os dados da tabela
  useEffect(() => {
    setLista(API.list());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // gera a lista de itens da tabela
  function getLista() {
    return lista.map((item, idx) => (
      <tr key={idx}>
        <td>{item.nome}</td>
        <td>{item.idade}</td>
        <td>{item.cpf}</td>
        <td><Link className='link' href={`${LINK_DO_MODULO}/editar?id=${item.id}`}>Editar</Link></td>
      </tr>
    ));
  }

  return (
    <div className='p-4 mx-auto'>

      <Link href={`${LINK_DO_MODULO}/editar?novo`} className='hover:text-blue-600 text-lg'>
        <PlusCircleOutlined className='text-[1.3em] mr-2' />
        Adicionar
      </Link>

      <table className='TabelaBasica'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>CPF</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {getLista()}
        </tbody>
      </table>

    </div>
  )
}
