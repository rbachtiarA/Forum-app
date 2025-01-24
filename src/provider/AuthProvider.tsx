'use client'

import { checkAnon, checkUser, create, createAnon, deleteUser } from "@/features/cookies"
import { createClient } from "@/lib/supabase/client"
import { createContext, useContext, useEffect, useState } from "react"

type User = {
    name: string | null,
    email: string | null
}

type AuthCtx = {
    user: User | null,
    onLogin: (name: string, email: string) => void,
    onLogout: () => void
}

const AuthContext = createContext<AuthCtx>({
    user: null,
    onLogin: () => {},
    onLogout: () => {}
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const getUser = async () => {
        const userName = await checkUser()
        setUser(userName) 
    }

    const getGenetic = async () => {
        const genetics = await checkAnon()
        if(!genetics) {
            console.log('create genetic');
            
            const supabase = await createClient()
            const { data, error } = await supabase.auth.signInAnonymously()
            if(data.user && !error) {
                await createAnon(data.user.id)
            }
        }
    }

    const onLogout = async () => {
        await deleteUser()
        getUser()
    }
    const onLogin = async (name:string, email:string) => {
        await create(name, email)
        getUser()
    }

    useEffect(() => {
        getGenetic()
        getUser()
    }, [])
    
    return (
        <AuthContext.Provider value={{user, onLogin, onLogout}}>
            {children}
        </AuthContext.Provider>
    )  
}