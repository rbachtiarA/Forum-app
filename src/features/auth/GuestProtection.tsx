'use client'
import KriiboLogoLoading from '@/components/ui/KriiboLogoLoading'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

export default function GuestProtection({ children }: { children: ReactNode }) {
    const { data, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if(!data && !isLoading) {
            router.push("/sign-in")
        }
    }, [data, isLoading, router])

    if(isLoading) return <KriiboLogoLoading />
    if(!data) return null
  return (
    <>
        {children}
    </>
  )
}
