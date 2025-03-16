import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { type NextRequest } from "next/server"

export async function GET(
    requset: NextRequest,
) {
    const limit = 5
    const searchParams = requset.nextUrl.searchParams
    const cursor = searchParams.get("c")
    const username = searchParams.get("u")
    let postsParameter: Prisma.PostWhereInput = {} 
    let cursorParameter: Prisma.PostWhereInput = {} 
    
    if(username) postsParameter = {
        user: {
            username
        }
    }
    
    if(cursor) cursorParameter = {
        createdAt: {
            lt: new Date(Number(cursor))
        }
    }

    const posts = await prisma.post.findMany({
        where: { 
            ...postsParameter,  
            ...cursorParameter
        },
        take: limit,
        omit: {
            userId: true
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: {
                select: {
                    username: true,
                    name: true,
                    picture: true
                }
            }
        },
    })

    const users: { [key:string]: { name: string | null, picture: string | null } } = {};
    const formattedPost = posts.map((post) => {
        users[post.user.username] = { name: post.user.name, picture: post.user.picture }
        return { ...post, user: post.user.username}
    })
    const lastCursor = (new Date(formattedPost[formattedPost.length - 1].createdAt)).valueOf()
    return Response.json({
        users,
        posts: formattedPost,
        cursor: `${lastCursor}`
    })
}