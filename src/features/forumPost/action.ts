'use server'

import prisma from "@/lib/prisma";
import { createSSRClient } from "@/lib/supabase/server";
import { type PostSchema } from "@/utils/schemas/CreatePostSchema";

export async function createPost({ content, title }: PostSchema) {
    try {
        const supabase = await createSSRClient()
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