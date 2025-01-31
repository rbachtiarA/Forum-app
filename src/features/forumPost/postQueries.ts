import { queryOptions } from "@tanstack/react-query"
import { getPosts } from "./action"
export const postsOptions = queryOptions({
    queryKey: ["posts"],
    queryFn: async () => {
        return await getPosts()
    }
})