'use server'

import prisma from "@/lib/prisma";
import { type PostSchema } from "@/utils/schemas/CreatePostSchema";

export async function action(data: PostSchema) {
    try {
        const newPost = await prisma.post.create({
            data
        })
        
        console.log(newPost);
        
    } catch {
        console.log('Internal Server Error')
    }


}