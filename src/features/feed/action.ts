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