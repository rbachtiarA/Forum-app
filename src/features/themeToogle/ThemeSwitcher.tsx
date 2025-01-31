'use client'

import dynamic from "next/dynamic"

const ThemeToogle = dynamic(() => import('./ThemeToogle'), { ssr: false })

export default function ThemeSwitcher() {
  return (
    <div>
        <ThemeToogle /> 
    </div>
  )
}
