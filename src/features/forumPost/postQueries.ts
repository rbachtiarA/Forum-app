import { queryOptions } from "@tanstack/react-query"
import { getPosts } from "./action"
export const postsOptions = queryOptions({
    queryKey: ["posts"],
    queryFn: async () => {
        try {
            return await getPosts()
        } catch {
            return null
        }
    },
    staleTime: 30000,
    refetchOnWindowFocus: false
})