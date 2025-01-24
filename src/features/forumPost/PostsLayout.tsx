import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"

export default async function PostsLayout() {
    const posts = await prisma.post.findMany()
  return (
    <div>
        {posts.map((post) => (
            <Card key={post.id}>
                <CardHeader>
                    <CardTitle>
                        {post.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{post.content}</p>
                </CardContent>
                <CardFooter>
                    {post.createdAt.toDateString()}
                </CardFooter>
            </Card>
        ))}
    </div>
  )
}
