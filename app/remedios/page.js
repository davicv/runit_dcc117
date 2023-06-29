"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ApiDados from '@/lib/apidados';
import { PlusCircleOutlined } from '@ant-design/icons';

const NOME_TABELA = 'remedios';        // nome da tabela
const LINK_DO_MODULO = `${NOME_TABELA}`;  // link da página (ex.: /modelo)

const API = new ApiDados(NOME_TABELA);    // acessa os dados da tabela


export default function Peso() {
  const [lista, setLista] = useState([]);
  const dt = new Date();

  const idDia = dt.getDay();
  const diasDaSemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

  // carrega os dados da tabela
  useEffect(() => {
    setLista(API.list());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function getDias() {
    const listaSuplementos = API.list();
    let idx = idDia;

    const list = [];
    for(let count = 0; count < 7 ; idx++, count++) {
      if (idx >= 7)
        idx = 0;

      let diaStr = count === 0 ? 'Suplementos de Hoje' : diasDaSemana[idx];

      list.push(
        <div key={idx} className='text-left font-semibold pb-8'>
          <div className={`text-center ${idx == idDia ? 'text-blue-600' : 'text-gray-400'}`}>{diaStr}</div>
          {getSuplementosDoDia (idx, listaSuplementos)}
        </div>
      );
    }
    return list;
  }

  function getSuplementosDoDia(idx, lista) {
    return lista
      .filter(item => item.dias[idx])
      .map((item, idx) => { return (
        <div className='m-3 py-2 bg-white p-4 border border-gray-300 shadow-lg rounded-lg font-semibold' key={item.id * 10 + idx}>
          <Link href={`${LINK_DO_MODULO}/editar?id=${item.id}`} className='font-semibold hover:text-blue-600'>{item.nome}</Link>,
          <div className='flex font-normal'>
            <div className='my-1'>{item.quantidade}</div>
            <div className='my-1 flex-1 text-right'>{item.intervalo} horas</div>
          </div>
        </div>
      )});
  }

  return (
    <div className='p-4 min-w-[200px] max-w-[360px] w-full mx-auto'>
        {getDias()}

        <center>
          <Link href={`${LINK_DO_MODULO}/editar?novo`} className='iconAction'>
            <PlusCircleOutlined className='' />
          </Link>
        </center>
    </div>
  )
}
