import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import config from '@/lib/config';

/**
 * Cria um botão com uma imagem
 * @param {Object} props
 * @param {string} props.descricao Descrição do botão
 * @param {string} props.className Descrição do botão
 * @param {string} props.href Url da página
 * @param {string} [props.img] Nome da imagem
 * @returns 
 */
export default function BotaoLateral(props) {
  const {descricao, img, href, ..._props} = props;
  const img2 = img ? `${config.basePath}${img}` : `${config.basePath}/img/image.png`;
  

  return (
    <Link href={href} alt={descricao}
      className={`${props.className} w-full 
        p-3 cursor-pointer
        text-white/90
        hover:bg-secondary-bg/80
        font-medium
        text-xl
        flex`}
        {..._props}
    >
      <Image src={img2} className='mx-2 h-7 w-7 my-auto' width={36} height={36} alt={props.descricao} style={{ filter: 'invert(85%)' }} />
      <div className='flex-1 w-full m-auto mr-2'>
        {props.descricao}
      </div>
    </Link>
  )
}
