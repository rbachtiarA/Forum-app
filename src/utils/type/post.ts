import { Post, Prisma } from "@prisma/client";

export type PostUser = Prisma.PostGetPayload<{
    include: {
        user: {
            select: {
                username: true,
                picture: true
            }
        }
    }
}>

export type PostUserProfile = Post