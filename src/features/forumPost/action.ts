'use server'

import prisma from "@/lib/prisma";
import { createServerSideClient } from "@/lib/supabase/server";
import { type PostSchema } from "@/utils/schemas/CreatePostSchema";

export async function createPost({ content, title }: PostSchema) {
    try {
        const supabase = await createServerSideClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if(!user) throw 'invalid user'
        await prisma.post.create({
            data: {
                content,
                title,
                userId: user?.id
            }    
        })        
    } catch {
        console.log('Internal Server Error')
    }
}

export async function getPosts(sort: 'ASC' | 'DES' = 'DES') {
    switch (sort) {
        case 'ASC':
            return await prisma.post.findMany({
                orderBy: {
                    createdAt: 'asc'
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
        case 'DES':
            return await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc'
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

        default:
            return await prisma.post.findMany({
                include: {
                    user: {
                        select: {
                            username: true,
                            picture: true
                        }
                    }
                }
            })
    }
}

export async function getPostsUser(username: string) {
    try {
        const userId = await prisma.profile.findUnique({
            where: {
                username: username
            },
            select: {
                id: true
            }
        })
        if(!userId) throw { data: null, error: 'NOT_FOUND' }
        const userPosts = await prisma.post.findMany({
            where: {
                userId: userId.id
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
        return { data: userPosts || [], error: null } 
    } catch (error) {
        return { error }
    }
}