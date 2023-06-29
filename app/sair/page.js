"use client"

import React from 'react'
import Image from 'next/image';
import Sessao from '@/lib/sessao';
import { useRouter } from 'next/navigation';


export default function Sair() {
  const router = useRouter();

  /**
   * Desconecta
   */
  function logout(event) {
    event.preventDefault();
    Sessao.set('idUsuario', 0);
    router.push('/login');
    return false;
  }

  /**
   * Retorna para o perfil
   */
  function irPainel(event) {
    event.preventDefault();
    router.push('/painel');
    return false;
  }

  return (
    <>
      <form className='m-auto p-5 text-center'>

        <Image src='/img/logo.png' width={272} height={198} alt='Logotipo' className='mb-14' />

        <div className='text-[#00f] font-bold'>Você deseja desconectar?</div>

        <div className='mt-10 font-bold'>
          <input type='submit' onClick={logout} value="SIM"
            className='px-12 py-2 bg-[#0f0f0f] text-secondary italic text-lg shadow-xl cursor-pointer hover:bg-[#0f0f0f]/80'
          />
          <input type='button' onClick={irPainel} value="NÃO"
            className='px-12 py-2 bg-gray-200 border border-gray-300 text-[#0f0f0f] italic text-lg shadow-xl cursor-pointer hover:bg-[#f0f0f0]/80'
          />
        </div>

      </form>
    </>
  )
}
