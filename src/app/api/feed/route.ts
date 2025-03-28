import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { type NextRequest } from "next/server"

export async function GET(
    request: NextRequest,
) {
    const limit = 5
    const searchParams = request.nextUrl.searchParams
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
            },
            _count: {
                select: {
                    comment: true,
                    votes: true
                }
            },
            votes: {
                select: {
                    voteScore: true,
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        },
        
    })
    const users: { [key:string]: { name: string | null, picture: string | null } } = {};
    if(posts.length == 0) return Response.json({
        users,
        posts: [],
        cursor: ""
    })
    const formattedPost = posts.map((post) => {
        users[post.user.username] = { name: post.user.name, picture: post.user.picture }
        const upvote = post.votes.filter((vote) => vote.voteScore === 1).length - post.votes.length
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            user: post.user.username,
            upvote,
            totalComment: post._count.comment,
            totalVote: post._count.votes  
        }
    })
    const lastCursor = (new Date(formattedPost[formattedPost.length - 1].createdAt)).valueOf()
    return Response.json({
        users,
        posts: formattedPost,
        cursor: `${lastCursor}`
    })
}