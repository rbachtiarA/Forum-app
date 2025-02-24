import React, { ReactNode } from 'react'

export default function FirstWrapper({ children }: { children: ReactNode }) {
  return (
    <div className='md:min-w-[480px] max-w-[720px] w-full py-2 px-1'>
        {children}
    </div>
  )
}
