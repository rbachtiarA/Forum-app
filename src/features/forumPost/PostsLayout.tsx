import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { postsOptions } from "./postQueries"
import { PostLists } from "./PostLists"

export default async function PostsLayout() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000
            }
        }
    })
    await queryClient.prefetchQuery(postsOptions)

  return (
    <div className="flex flex-col gap-y-2 mt-2">
        <h1>Timeline Post</h1>
        <HydrationBoundary state={dehydrate(queryClient)} >
            <PostLists />
        </HydrationBoundary>
    </div>
  )
}
