'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { postsOptions } from './postQueries'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function PostLists() {
  const { data, isError, error } = useQuery(postsOptions)

  if(!data || isError) {
    console.log(error?.message);
    
    return (
      <div>
        <h1>500 : Internal Server Error</h1>
        <h2>Something is wrong, wait for our staff to fix it</h2>
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-y-2 mt-2'>
      {data.map((post) => (
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