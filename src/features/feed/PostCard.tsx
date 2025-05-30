import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { postDateText } from '../../utils/postDate'
import { FeedPost, FeedUser } from '@/utils/type/feed'
import Link from 'next/link'
import { ArrowBigDown, ArrowBigUp, MessageSquare } from 'lucide-react'

export default function PostCard({ post, currentDate, user }: { post: FeedPost, user: FeedUser, currentDate: Date }) {
  return (
    <Card className=''>
        <CardHeader className='flex flex-col py-3 space-y-2'>
            <div className='flex gap-2'>
                <Link href={`/${post.user}`} className='flex gap-2 items-center group' prefetch={false}>
                    <Avatar className='h-6 w-6'>
                        <AvatarImage src={user.picture??''} alt='profile picture' />
                        <AvatarFallback className='text-xs'>{post.user[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <p className='group-hover:underline'>{post.user}</p>
                </Link>
                •
                <p className='text-muted-foreground'>
                    {postDateText(new Date(post.createdAt), currentDate)}
                </p>
            </div>
            <CardTitle className='font-semibold'>
                {post.title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p>{post.content}</p>
        </CardContent>
        <CardFooter className='flex justify-end gap-4'>
                <div className='flex gap-2 bg-accent px-2 py-1 rounded-full'>
                    <ArrowBigUp />
                    <p>{post.totalVote - (post.totalVote - post.upvote)}</p>
                    <ArrowBigDown />
                </div>
                <div className='flex gap-1 bg-accent px-2 py-1 rounded-full'>
                    <p>{post.totalComment}</p>
                    <MessageSquare />
                </div>
        </CardFooter>
    </Card>
  )
}
