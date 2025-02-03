import prisma from "@/lib/prisma"
import { createSSRClient } from "@/lib/supabase/server"

export async function getUserSession() {
    const supabase = await createSSRClient()
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