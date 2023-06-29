"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ApiDados from '@/lib/apidados';

import { Button, Input } from 'antd';
import { InputNumber } from 'antd';


export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [peso, setPeso] = useState('');

  const API = new ApiDados('pesos');
  const editId = searchParams.has('novo') ? 'novo' : searchParams.get('id');

  useEffect(() => {
    if (editId === 'novo') 
      novo();
    else
      carregar();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function voltar() {
    router.push('/peso');
  }

  function novo() {
    const dt = new Date();
    setData(dt.toLocaleDateString());
    setHora(dt.toLocaleTimeString());
    setPeso('');
  }

  function carregar() {
    const dados = API.get(editId);
    setData(dados.data);
    setHora(dados.hora);
    setPeso(dados.peso);
  }

  function salvar(event) {
    event.preventDefault();
    const dados = {
      data,
      hora,
      peso
    }

    if (editId === 'novo')
      API.add(dados)
    else
      API.set(editId, dados);

    voltar();
  }

  return (
    <form onSubmit={salvar} className='w-[200px] mx-auto'>

      <Input className='my-2' addonBefore="Data" placeholder="Data" value={data} onChange={(event) => setData(event.target.value)} />

      <Input className='my-2' addonBefore="Hora" placeholder="Hora" value={hora} onChange={(event) => setHora(event.target.value)} />

      <InputNumber
        addonBefore="Peso" 
        className='my-2'
        formatter={(value) => value?.replace(/\./g, ',')}
        parser={(value) => value?.replace(/,/g, '.')}
        value={peso} onChange={(value) => setPeso(value)}          
      />

      <div className='w-fit mx-auto'>
        <Button type="primary" htmlType="submit" size={'middle'} onClick={salvar}>Salvar</Button>
        <Button size={'middle'} onClick={voltar}>Voltar</Button>
      </div>

    </form>
  )
}
