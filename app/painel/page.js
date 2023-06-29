"use client"

import BotaoPrincipal from '@/components/botaoprincipal'
import ApiDados from '@/lib/apidados';
import config from '@/lib/config'
import { useEffect } from 'react';

function iniciarDados() {
  const remedios = '[{"nome":"Whey Protein","quantidade":"50gr","dias":[true,false,false,false,true,true,true],"intervalo":12,"id":1},{"nome":"Suplemento ABC","quantidade":"100gr","dias":[true,false,false,true,false,false,true],"intervalo":8,"id":2},{"nome":"Albumina","quantidade":"1 comprimido","dias":[false,true,true,true,true,true,false],"intervalo":12,"id":3}]';
  const pesos = '[{"data":"27/06/2023","hora":"14:40:46","peso":75,"id":1},{"data":"28/06/2023","hora":"07:40:49","peso":76,"id":2},{"data":"29/06/2023","hora":"11:30:00","peso":75.5,"id":3}]';
  const ficha = '[{"nome":"CADEIRA FLEXORA","repeticoes":3,"carga":25,"intervalo":30,"id":1},{"nome":"AFUNDO COM BARRA","repeticoes":2,"carga":40,"intervalo":90,"id":2},{"nome":"CADEIRA EXTENSORA","repeticoes":5,"carga":30,"intervalo":60,"id":3}]';

  importar('remedios', remedios);
  importar('pesos', pesos);
  importar('ficha', ficha);
}


function importar(tabela, listaStr) {
  const API = new ApiDados(tabela);

  try {
    const lista = JSON.parse(listaStr);

    if (API.list() && lista.length <= API.list().length)
      return;

    for (let i = 0 ; i < lista.length ; i++) {
      API.add(lista[i]);
    }

  } catch(err) {
    console.error(err);
  }
}

export default function Home() {
  const path = config.basePath;

  useEffect(() => {
    iniciarDados()
  }, []);

  return (
    <div className='flex-1 flex flex-col p-2'>
      <div className='flex-1'></div>
      <div className='w-full min-w-[240px] max-w-[330px] mx-auto'>
      <BotaoPrincipal descricao='PERFIL' href='/perfil' img={`${path}/img/user.png`} />
        {/*<BotaoPrincipal descricao='FREQUÊNCIA' href='/frequencia' img={`${path}/img/calendar_dot.png`} />*/}
        <BotaoPrincipal descricao='FICHA' href='/ficha' img={`${path}/img/muscle.png`} />
        <BotaoPrincipal descricao='SUPLEMENTOS' href='/remedios' img={`${path}/img/pills.png`} />
        <BotaoPrincipal descricao='CONTROLE DE PESO' href='/peso' img={`${path}/img/weight.png`} />
      </div>
      <div className='flex-1'></div>
    </div>
  )
}
