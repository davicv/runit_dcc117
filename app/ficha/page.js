"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ApiDados from '@/lib/apidados';
import { PlusCircleOutlined } from '@ant-design/icons';

const NOME_TABELA = 'ficha';             // nome da tabela
const LINK_DO_MODULO = `${NOME_TABELA}`;  // link da página (ex.: /modelo)

const API = new ApiDados(NOME_TABELA);    // acessa os dados da tabela


export default function Peso() {
  const [lista, setLista] = useState([]);


  // carrega os dados da tabela
  useEffect(() => {
    setLista(API.list());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function formatarIntervalo(intervalo) {
    intervalo = parseInt(intervalo) || 0;

    if (intervalo < 60) {
      return `${intervalo} seg`
    } else {
      const min = Math.floor(intervalo / 60);
      const seg = Math.floor(intervalo % 60);

      return seg == 0 ? `${min} min` :  `${min}:${seg} min`;
    }
  }


  // gera a lista de itens da tabela
  function getLista() {
    return lista.map((item, idx) => (
      <div key={idx} className='fichaInfo'>
        <div className='my-1 font-semibold'>
          <Link href={`${LINK_DO_MODULO}/editar?id=${item.id}`} className='font-semibold'>{item.nome}</Link>
        </div>
        <div className='flex'>
          <div className='my-1'>{item.repeticoes} vezes</div>
          <div className='my-1 flex-1 text-right'>{formatarIntervalo(item.intervalo)}</div>
        </div>
        <div className='my-1 inline-block'>Carga: {item.carga} Kg</div>
      </div>
    ));
  }

  return (
    <div className='p-4'>
      <center>
        {getLista()}

        <Link href={`${LINK_DO_MODULO}/editar?novo`} className='iconAction'>
          <PlusCircleOutlined className='' />
        </Link>
      </center>
    </div>
  )
}
