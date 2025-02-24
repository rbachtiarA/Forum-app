import prisma from "@/lib/prisma"
import { createServerSideClient } from "@/lib/supabase/server"

// TODO : FIX THIS ERROR PROBLEM

export async function getUserSession() {
    const supabase = await createServerSideClient()
    const { data } = await supabase.auth.getUser()
    return data.user
}

export async function userPermission(username: string) {
    let permission: 'VISITOR' | 'OWNER' = 'VISITOR'
    const userProfile = await prisma.profile.findUnique({
        where: {
            username
        }
    })
    if(!userProfile?.id) return { data: null, error: 'INVALID_PAGE' }

    const userPagePosts = await prisma.post.findMany({
        where: {
            userId: userProfile?.id
        },
        include: {
            user: {
                select: {
                    username: true,
                    picture: true
                }
            }
        }
    })

    const supabase = await createServerSideClient()
    const { data: { user: visitor }, error } = await supabase.auth.getUser()
    
    if(error || !visitor) return { data: null, error: 'AUTH_INVALID' }
    if(userProfile.id === visitor.id) permission = 'OWNER' 
    return {
        data: {
            userProfile,
            posts: userPagePosts,
            permission
        },
        error: null
    }
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