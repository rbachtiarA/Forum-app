export type FeedPost = {
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    content: string,
    user: string
}

export type FeedUser = {
    name: string | null,
    picture: string | null
}

export type FeedPostsData = {
    users: {
        [key:string]: FeedUser
    }
    posts: FeedPost[],
    cursor: string
}
