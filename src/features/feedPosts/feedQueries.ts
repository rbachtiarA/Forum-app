import { type FeedPostsData } from "@/utils/type/feed"
import { queryOptions } from "@tanstack/react-query"

export const feedAPIOptions = (username?: string) => queryOptions({
    queryKey: ["posts", username],
    queryFn: async ({ queryKey }) => {
        const [, username] = queryKey
        const queryParams = `?u=${username}` 
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feed${username? queryParams : ''}`, {
            method: 'GET'
        })
        const data: FeedPostsData = await res.json()
        return data
    },
    staleTime: 30000,
    refetchOnWindowFocus: false
})