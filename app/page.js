"use client"
import Sessao from '@/lib/sessao';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const idUsuario = Sessao.get('idUsuario');

    if (idUsuario >= 1)
      router.push('/painel');
    else
      router.push('/login');
     
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='text-center p-10'>Carregando...</div>
  )
}
