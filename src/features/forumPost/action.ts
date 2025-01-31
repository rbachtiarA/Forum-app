'use server'

import prisma from "@/lib/prisma";
import { type PostSchema } from "@/utils/schemas/CreatePostSchema";

export async function createPost(data: PostSchema) {
    try {
        await prisma.post.create({
            data
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
                }
            })
        case 'DES':
            return await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            })

        default:
            return await prisma.post.findMany()
    }
}