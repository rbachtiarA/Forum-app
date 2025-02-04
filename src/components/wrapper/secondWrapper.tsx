import React, { ReactNode } from 'react'

export default function SecondWrapper({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col gap-4'>
        {children}
    </div>
  )
}
