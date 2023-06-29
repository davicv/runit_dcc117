import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Cria um botão com uma imagem
 * @param {Object} props
 * @param {string} props.descricao Descrição do botão
 * @param {string} props.href Url de destino
 * @param {string} props.className Descrição do botão
 * @param {string} [props.img] Nome da imagem
 * @returns 
 */
export default function BotaoPrincipal(props) {
  return (
    <Link href={props.href} alt={props.descricao}
      className={`${props.className} w-full h-[90px] overflow-hidden
        border border-secondary-dark rounded-md shadow-md
        bg-secondary shadow-gray-500 p-2 my-2
        hover:bg-secondary/75 hover:border-secondary-dark/75 cursor-pointer
        text-secondary-bg font-medium text-2xl
        flex
    `}>
      <Image src={props.img} className='mx-3 h-9 w-9 my-auto' width={36} height={36} alt={props.descricao}/>
      <div className='flex-1 w-full text-center m-auto'>{props.descricao}</div>
    </Link>
  )
}
