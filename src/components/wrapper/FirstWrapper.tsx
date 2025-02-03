import React, { ReactNode } from 'react'

export default function FirstWrapper({ children }: { children: ReactNode }) {
  return (
    <div className='md:min-w-[480px] max-w-[1080px] w-full'>
        {children}
    </div>
  )
}
