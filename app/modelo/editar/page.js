"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ApiDados from '@/lib/apidados';

import { Button, Input } from 'antd';
import { InputNumber } from 'antd';

const NOME_TABELA = 'modelo';             // nome da tabela
const LINK_DO_MODULO = `/${NOME_TABELA}`;  // link da página (ex.: /modelo)

const API = new ApiDados(NOME_TABELA);    // acessa os dados da tabela


export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.has('novo') ? 'novo' : searchParams.get('id');

  // variáveis dos campos editáveis
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cpf, setCPF] = useState('');


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
    setIdade('');
    setCPF('');
  }


  // carrega os dados de um registro
  function carregar() {
    const dados = API.get(editId);
    setNome(dados.nome);
    setIdade(dados.idade);
    setCPF(dados.cpf);
  }


  // salva os dados
  function salvar(event) {
    event.preventDefault();

    // dados que serão salvos
    const dados = {
      nome,
      idade,
      cpf
    }

    // verifica se é para criar um novo registro ou salvar um registro existente
    if (editId === 'novo')
      API.add(dados)
    else
      API.set(editId, dados);

    voltar();
  }

  return (
    <form onSubmit={salvar} className='w-[200px] mx-auto'>

      <Input className='my-2' addonBefore="Nome" placeholder="Nome" value={nome} onChange={(event) => setNome(event.target.value)} />

      <InputNumber
        className='my-2' addonBefore="Idade"
        min='0' max='120'
        value={idade} onChange={(value) => setIdade(value)}          
      />

      <Input className='my-2' addonBefore="CPF" placeholder="CPF" value={cpf} onChange={(event) => setCPF(event.target.value)} />

      <div className='w-fit mx-auto'>
        <Button type="primary" htmlType="submit" size={'middle'} onClick={salvar}>Salvar</Button>
        <Button size={'middle'} onClick={voltar}>Voltar</Button>
      </div>

    </form>
  )
}
