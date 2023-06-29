"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ApiDados from '@/lib/apidados';

import { Button, Input } from 'antd';
import { InputNumber } from 'antd';
import { AutoComplete } from 'antd';

import ListaExercicios from '@/dados_estaticos/lista_exercicio';

const NOME_TABELA = 'ficha';              // nome da tabela
const LINK_DO_MODULO = `/${NOME_TABELA}`; // link da página (ex.: /modelo)

const API = new ApiDados(NOME_TABELA);    // acessa os dados da tabela


export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.has('novo') ? 'novo' : searchParams.get('id');

  const [nome, setNome] = useState('');
  const [repeticoes, setRepeticoes] = useState(3);
  const [carga, setCarga] = useState(10);
  const [intervalo, setIntervalo] = useState(60);
  const [options, setOptions] = useState([]);


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


  // limpa os campos para criar um novo registro
  function novo() {
    const dt = new Date();
    setNome('');
    setRepeticoes(3);
    setCarga(0);
    setIntervalo(60);
  }


  // carrega os dados de um registro
  function carregar() {
    const dados = API.get(editId);
    setNome(dados.nome);
    setRepeticoes(dados.repeticoes);
    setCarga(dados.carga);
    setIntervalo(dados.intervalo);
  }


  // salva os dados
  function salvar(event) {
    event.preventDefault();

    // dados que serão salvos
    const dados = {
      nome,
      repeticoes,
      carga,
      intervalo
    }

    // verifica se é para criar um novo registro ou salvar um registro existente
    if (editId === 'novo')
      API.add(dados)
    else
      API.set(editId, dados);

    voltar();
  }


  function selecionarAutocomplete(str) {
    const sfind = str.toLocaleUpperCase();
    const res = ListaExercicios
      .filter(value => value.includes(sfind))
      .map((val) => { return {value: val} })

    setOptions(res);
  }


  return (
    <form onSubmit={salvar} className='min-w-[250px] mx-auto'>

      <div className='baseInput'>
        <label className='w-[100px]'>Nome</label>
        <AutoComplete className='w-[250px]'
          options={options} value={nome} onChange={(str) => setNome(str)} onSearch={selecionarAutocomplete}
        />
      </div>

      <div className='baseInput'>
        <label className='w-[100px]'>Repetições</label>
        <InputNumber
          min='0' max='200'
          value={repeticoes} onChange={(value) => setRepeticoes(value)}          
        />
      </div>

      <div className='baseInput'>
        <label className='w-[100px]'>Carga (Kg)</label>
        <InputNumber
          min='0' max='1000' step='5'
          value={carga} onChange={(value) => setCarga(value)}          
        />
      </div>

      <div className='baseInput'>
        <label className='w-[100px]'>Intervalo (seg)</label>
        <InputNumber
          min='0' max='10000' step='5'
          value={intervalo} onChange={(value) => setIntervalo(value)}
        />
      </div>


      <div className='w-fit mx-auto'>
        <Button type="primary" htmlType="submit" size={'middle'} onClick={salvar}>Salvar</Button>
        <Button size={'middle'} onClick={voltar}>Voltar</Button>
      </div>

    </form>
  )
}
