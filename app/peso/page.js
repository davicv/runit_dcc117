"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import ApiDados from '@/lib/apidados';
import config from '@/lib/config';
import { PlusCircleOutlined } from '@ant-design/icons';


export default function Peso() {
  const [lista, setLista] = useState([]);
  const API = new ApiDados('pesos');

  useEffect(() => {
    setLista(API.list())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getLista() {
    return lista.map((item, idx) => (
      <tr key={idx}>
        <td><Link href={`/peso/editar?id=${item.id}`}>{item.data}</Link></td>
        <td>{item.hora}</td>
        <td>{parseFloat(item.peso).toFixed(3).replace('.', ',')} kg</td>
      </tr>
    ));
  }

  return (
    <div className='p-4 mx-auto'>

    {/*
      <Link href='/peso/editar?novo' className='hover:text-blue-600'>
        <Image src={`${config.basePath}/img/weight_add.png`} width={32} height={32} alt='Adicionar' className='inline-block mr-3 hover:opacity-75' />
        Adicionar
      </Link>
    */}

      <table className='TabelaBasica mt-5'>
        <thead>
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Peso</th>
          </tr>
        </thead>
        <tbody>
          {getLista()}
        </tbody>
      </table>

      <center>
        <Link href={`/peso/editar?novo`} className='iconAction'>
          <Image src={`${config.basePath}/img/weight_add.png`} width={24} height={24} alt='Adicionar' className='inline-block mr-3 hover:opacity-75' />
          <span className='text-lg '>Adicionar</span>
        </Link>
      </center>

    </div>
  )
}
