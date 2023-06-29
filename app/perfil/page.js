"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ApiDados from '@/lib/apidados';
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';
import Sessao from '@/lib/sessao';

const NOME_TABELA = 'perfil';             // nome da tabela
const LINK_DO_MODULO = `${NOME_TABELA}`;  // link da página (ex.: /modelo)

const API = new ApiDados(NOME_TABELA);    // acessa os dados da tabela


export default function Perfil() {
  const [perfil, setPerfil] = useState({});


  // carrega os dados da tabela
  useEffect(() => {
    carregarPerfil()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  function usuarioNaoCadastrado() {
    return {
      id: 0,
      nome: 'NOME E SOBRENOME',
      idade: 33,
      peso: 77,
      altura: 1.83,
      email: 'nao@cadastrado.com'
    }
  }


  function carregarPerfil() {
    const idUsuario = Sessao.get('idUsuario', 0);
    console.log({idUsuario});

    let dados = !idUsuario ? usuarioNaoCadastrado() : API.get(idUsuario);
    setPerfil(dados);
  }


  function formatarAltura(altura) {
    let alt, sigla;

    altura = parseFloat(altura) || 0;
    if (altura < 1) {
      alt = Math.floor(altura * 100)
      sigla = 'cm'

    } else {
      alt = altura.toFixed(2);
      sigla = 'm'
    }

    return `${alt} ${sigla}`
  }

  return (
    <>
      <Link href={`#`} className='iconFloatRight'> 
        <EditOutlined className='text-[36px]'/>
      </Link>
      
      <div className='m-auto p-4 text-center'>

        <Link href={`#`} className='iconLink'>
          <UserAddOutlined className='text-[75px] p-4'/>
        </Link>

        <div style={{
          fontWeight: '300',
          marginTop: '70px'
        }}>
          <h2 className='m-4'>{perfil.nome}</h2>
          <h3 className='m-4'>{perfil.idade} ANOS</h3>
          <h3 className='m-4'>{perfil.peso}Kg</h3>
          <h3 className='m-4'>{formatarAltura(perfil.altura)}</h3>
          <h3 className='m-4'>{perfil.email}</h3>
        </div>
      </div>
    </>
  )
}
