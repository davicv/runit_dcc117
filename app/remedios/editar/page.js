"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ApiDados from '@/lib/apidados';

import { Button, Input } from 'antd';
import { InputNumber } from 'antd';
import { Checkbox } from 'antd';

const NOME_TABELA = 'remedios';           // nome da tabela
const LINK_DO_MODULO = `/${NOME_TABELA}`; // link da página (ex.: /modelo)

const API = new ApiDados(NOME_TABELA);    // acessa os dados da tabela



export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.has('novo') ? 'novo' : searchParams.get('id');

  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [dias, setDias] = useState(getDiasPadrao());
  const [intervalo, setIntervalo] = useState('');


  // cria um novo registro ou carrega um existente para edição
  useEffect(() => {
    if (editId === 'novo') 
      novo();
    else
      carregar();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // retorna para a página de listagem
  function voltar() {
    router.push(LINK_DO_MODULO);
  }


  function getDiasPadrao() {
    return [false, false, false, false, false, false, false];
  }


  // limpa os campos para criar um novo registro
  function novo() {
    const dt = new Date();
    setNome('');
    setQuantidade('');
    setDias(getDiasPadrao());
    setIntervalo('');
  }


  // carrega os dados de um registro
  function carregar() {
    const dados = API.get(editId);
    setNome(dados.nome);
    setQuantidade(dados.quantidade);
    setDias(dados.dias);
    setIntervalo(dados.intervalo);
  }


  // salva os dados
  function salvar(event) {
    event.preventDefault();

    // dados que serão salvos
    const dados = {
      nome,
      quantidade,
      dias,
      intervalo
    }

    // verifica se é para criar um novo registro ou salvar um registro existente
    if (editId === 'novo')
      API.add(dados)
    else
      API.set(editId, dados);

    voltar();
  }

  function setDia(event, idx) {
    const val = event.target.checked;

    if (dias[idx] !== val) {
      const d = [...dias];
      d[idx] = (val == true);
      setDias(d);
    }
  }

  function getDiasCheckbox() {
    const diasStr = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return dias.map((val, idx) => {
      return (
        <div key={idx}>
          <Checkbox checked={val} onChange={(event) => setDia(event, idx)}>{diasStr[idx]}</Checkbox>
        </div>
      )});
  }

  return (
    <form onSubmit={salvar} className='min-w-[250px] mx-auto'>

      <div className='baseInput'>
        <label className='w-[125px]'>Nome</label>
        <Input className='w-[250px]'
          value={nome} onChange={(event) => setNome(event.target.value)}
        />
      </div>

      <div className='baseInput'>
        <label className='w-[125px]'>Quantidade</label>
        <Input className='w-[250px]'
          value={quantidade} onChange={(event) => setQuantidade(event.target.value)}          
        />
      </div>


      <div className='baseInput'>
        <label className='w-[125px]'>Intervalo (horas)</label>
        <InputNumber
          min='0' max='240' step='0'
          value={intervalo} onChange={(value) => setIntervalo(value)}
        />
      </div>

      <div className='baseInput'>
        <label className='w-[125px]'>Dias de uso</label>
        <div className='max-w-[200px] bg-white px-5 py-2'>
        { getDiasCheckbox() }
        </div>
      </div>

      <div className='w-fit mx-auto'>
        <Button type="primary" htmlType="submit" size={'middle'} onClick={salvar}>Salvar</Button>
        <Button size={'middle'} onClick={voltar}>Voltar</Button>
      </div>


    </form>
  )
}
