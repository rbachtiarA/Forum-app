import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { postDateText } from './postDate'
import { type PostUser } from '@/utils/type/post'
import Link from 'next/link'

export default function PostTemplate({ post, currentDate }: { post: PostUser, currentDate: Date }) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                {post.title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p>{post.content}</p>
        </CardContent>
        <CardFooter>
            <div className='flex justify-center items-center gap-2'>
                <Link href={`/${post.user.username}`} className='flex gap-2 justify-center items-center group'>
                    <Avatar>
                        <AvatarImage src={post.user.picture} alt='profile picture' />
                        <AvatarFallback>{post.user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className='group-hover:underline'>{post.user.username}</p>
                </Link>
                <p className='text-muted-foreground'>
                    {postDateText(post.createdAt, currentDate)}
                </p>
            </div>
        </CardFooter>
    </Card>
  )
}
