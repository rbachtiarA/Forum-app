import { PrismaClient } from '@prisma/client'
export async function GET() {
    try {
        const prisma = new PrismaClient()
        throw 'Error test'
        const getPost = await prisma.post.findMany()
        return Response.json({post: getPost})

    } catch {
        return new Response('Internal Server Error', {
            status: 500
        }).json()
    }
}