'use client'

import { checkUser, create, deleteUser } from "@/features/cookies"
import { useEffect, useState } from "react"

type User = {
    name: string | null,
    email: string | null
}

export default function useUser( initUser: User = {name: null, email: null}) {
    const [user, setUser] = useState<User>(initUser)

    const getUser = async () => {
        const userName = await checkUser()
        setUser(userName) 
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
        getUser()
    }, [])

    return  { user, onLogin, onLogout }   
}