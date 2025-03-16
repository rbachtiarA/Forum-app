import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { postDateText } from './postDate'
import { FeedPost, FeedUser } from '@/utils/type/feed'
import Link from 'next/link'

export default function PostCard({ post, currentDate, user }: { post: FeedPost, user: FeedUser, currentDate: Date }) {
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
                <Link href={`/${post.user}`} className='flex gap-2 justify-center items-center group'>
                    <Avatar>
                        <AvatarImage src={user.picture??''} alt='profile picture' />
                        <AvatarFallback>{post.user[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className='group-hover:underline'>{post.user}</p>
                </Link>
                <p className='text-muted-foreground'>
                    {postDateText(new Date(post.createdAt), currentDate)}
                </p>
            </div>
        </CardFooter>
    </Card>
  )
}
