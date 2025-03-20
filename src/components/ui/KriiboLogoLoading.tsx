import Image from 'next/image'
import React from 'react'

export default function KriiboLogoLoading() {
  return (
    <div className='flex-1 w-full max-h-screen animate-pulse transition flex items-center justify-center'>
        <Image src={'/Kriibo-logo.svg'} width={100} height={100} alt='Kriibo logo' />
    </div>
  )
}
