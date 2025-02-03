'use client'
import { useTheme } from "next-themes"
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
export default function ThemeToogle() {
    const { setTheme, theme } = useTheme()

    const handleClickTheme = () => {
        setTheme(theme === 'dark'? 'light' : 'dark')
    }

  return (
    <>
        <Button variant={'outline'} className="bg-secondary" size={'icon'} onClick={handleClickTheme}>
            {
                theme !== 'light' ? 
                <Moon /> :
                <Sun  />
                
            }
        </Button>
    </>
  )
}
