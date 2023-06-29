"use client"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Image from 'next/image'
import MenuLateral from './menulateral';
import config from '@/lib/config';
import { basePath } from '@/next.config';

export default function MenuBar(props) {
  const [ sidebar, setSidebar ] = useState(false);

  function toggleSidebar() {
    setSidebar(!sidebar);
    console.log ('toggle:', sidebar)
  }

  function showSidebar() {
     setSidebar(true);
  }

  function closeSidebar() {
     setSidebar(false);
  }

  // FIXME:: remover o tamanho fixo de 74px
  return (
    <>
    <div id="menubar" className="shadow shadow-slate-500 relative z-20 top-0 left-0 w-full m-0 bg-secondary-bg text-secondary">
      <div className="flex flex-row">
          <div className="flex-none my-auto hover:cursor-pointer  hover:bg-gray-600 p-2" onClick={toggleSidebar}>
              <Image src={`${config.basePath}/img/menu.svg`} width={36} height={36} alt='Menu'/>
          </div>
          <div className="flex-1 flex items-center rounded-xl px-1 ml-7">
              <div className='text-2xl italic font-thin'>RUN IT</div>
          </div>
      </div>
    </div>

    { sidebar && <MenuLateral onClose={closeSidebar} /> }
    </>
  )
}
