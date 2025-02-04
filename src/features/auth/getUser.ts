import prisma from "@/lib/prisma"
import { createServerSideClient } from "@/lib/supabase/server"

// TODO : FIX THIS ERROR PROBLEM
export async function getUserSession() {
    const supabase = await createServerSideClient()
    const { data } = await supabase.auth.getUser()
    return data.user
}

export async function getUserProfile(userId: string) {
    'use server'
    const user = await prisma.profile.findUnique({
        where: {
            id: userId
        },
        select: {
            username: true,
            picture: true,
        }
    })

    return user
}