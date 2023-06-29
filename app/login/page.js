"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import ApiDados from '@/lib/apidados';
import Sessao from '@/lib/sessao';
import { Input } from 'antd';
import { useRouter } from 'next/navigation';

const NOME_TABELA = 'perfil';            // nome da tabela
const LINK_DO_MODULO = `${NOME_TABELA}`;  // link da página (ex.: /modelo)

const API = new ApiDados(NOME_TABELA);    // acessa os dados da tabela


/**
 * Cria o mockup de uma perfil
 * @param {string} usuario nome do usuário
 * @param {string} senha senha
 * @returns {*} informações do perfil
 */
function criarUsuario(usuario, senha) {
  let nomes = "Miguel;Davi;Gabriel;Arthur;Lucas;Matheus;Pedro;Guilherme;Gustavo;Rafael;Felipe;Bernardo;Enzo;Nicolas;João Pedro;Pedro Henrique;Cauã;Vitor;Eduardo;Daniel;Henrique;Murilo;Vinicius;Samuel;Pietro;João Vitor;Leonardo;Caio;Heitor;Lorenzo;Isaac;Lucca;Thiago;João Gabriel;João;Theo;Bruno;Bryan;Carlos Eduardo;Luiz Felipe;Breno;Emanuel;Ryan;Vitor Hugo;Yuri;Benjamin;Erick;Enzo Gabriel;Fernando;Joaquim;Helena;Alice;Laura;Maria Alice;Sophia;Manuela;Maitê;Liz;Cecília;Isabella;Luísa;Eloá;Heloísa;Júlia;Ayla;Maria Luísa;Isis;Elisa;Antonella;Valentina;Maya;Maria Júlia;Aurora;Lara;Maria Clara;Lívia;Esther;Giovanna;Sarah;Maria Cecília;Lorena;Beatriz;Rebeca;Luna;Olívia;Maria Helena;Mariana;Isadora;Melissa;Maria;Catarina;Lavínia;Alícia;Maria Eduarda;Agatha;Ana Liz;Yasmin;Emanuelly;Ana Clara;Clara;Ana Júlia"
  let sobrenomes = "Martins;Oliveira;Silva;Rodrigues;Almeida;Cardoso;Gonçalves;Santos;Freitas;Ribeiro;Souza;Marques;Gomes;Fernandes;Ferreira;Carvalho;Alves;Machado;Pereira;Lopes;Vieira;Nascimento;Lima;Dias;Nunes;Costa;Teixeira;Coimbra;Ramos;Santana;Mendes;Andrade;Rocha;Soares;Barbosa;Magalhães;Amaral;Bernardes;Domingues;Dourado;Feitosa;Tavares;Castro;Reis;Duarte;Fonseca;Mendanha;Siqueira;Garcia;Novaes;Godoy;Chaves;Leal;Aguiar;Mendonça;Alvares;Gouveia;Cabral;Figueiredo;Azevedo;Torres;Araújo;Queiroz;Correia;Pedroso;Barros;Alvarenga;Fagundes;Bezerra;Brito;Viana;Vasconcelos;Medeiros;Peixoto;Freire;Pires;Campos;Pinto;Borges;Leite";

  nomes = nomes.split(';');
  sobrenomes = sobrenomes.split(';');

  const nome = nomes[(Math.random() * nomes.length) | 0];
  const sobrenome = sobrenomes[(Math.random() * sobrenomes.length) | 0];
  const nome_completo = `${nome} ${sobrenome}`;

  const dados = {
      id: 0,
      nome: (`${nome} ${sobrenome}`).toLocaleUpperCase(),
      idade: 14 + Math.random() * 70 | 0,
      peso: 40 + Math.random() * 100 | 0,
      altura: 1.20 + Math.round(Math.random() * 0.80 * 100) / 100.0,
      email: `${nome_completo.toLocaleLowerCase().replace(/[^a-z]/g, '_')}@gmail.com`,
      usuario: usuario.toLocaleLowerCase().trim(),
      senha
  }

  return dados;
}

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');


  /**
   * Carrega o perfil de um usuário
   * @param {string} usuario nome do usuário
   * @param {string} senha senha (no momento não está sendo verificada)
   * @returns {*} perfil do usuário ou null
   */
  function carregarUsuario(usuario, senha) {
    const lista = API.list();
    usuario = usuario.toLocaleLowerCase().trim();
    return lista.find(item => item.usuario === usuario);
  }


  /**
   * Faz o login ou cria uma conta mockup se o login não existir
   */
  function login(event) {
    event.preventDefault();
    
    let perfil = carregarUsuario(usuario, senha);
    let id;
    if (perfil) {
      id = perfil.id;

    } else {
      perfil = criarUsuario(usuario, senha);
      id = API.add(perfil);
    }

    console.dir ("Usuário:", perfil);

    Sessao.set('idUsuario', id);
    router.push('/painel');

    return false;
  }

  return (
    <>
      <form className='m-auto p-5 text-center'>

        <Image src='/img/logo.png' width={272} height={198} alt='Logotipo' className='mb-14' />

        <div className='w-full my-5'>
          <Input size="large" placeholder="Usuário" name='i_usuario' value={usuario} onChange={(event) => setUsuario(event.target.value)} />
        </div>

        <div className='w-full my-5'>
          <Input.Password size="large" placeholder="Senha" name='i_senha' value={senha} onChange={(event) => setSenha(event.target.value)} />
        </div>

        <div className='mt-10 font-bold'>
          <input type='submit' onClick={login} value="LOGIN"
            className='px-12 py-2 bg-[#0f0f0f] text-secondary italic text-lg shadow-xl cursor-pointer hover:bg-[#0f0f0f]/80'
          />
        </div>

      </form>
    </>
  )
}
