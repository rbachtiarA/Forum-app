'use client'
import React from 'react'
import PostCard from './PostCard'
import { useQuery } from '@tanstack/react-query'
import { feedAPIOptions } from './feedQueries'

export default function UserPostsFeed({ username }:{ username: string }) {
  const currentDate = new Date()
  const { data, isError, isLoading } = useQuery(feedAPIOptions(username))

  if(isLoading) return (
    <div>
      <h1>Fetching recent posts...</h1>
    </div>
  )

  if(!data?.posts.length) return (
    <div>
      <h1>User has not post anything yet</h1>
    </div>
  )

  if(isError) return (
    <div>
      <h1>Something is wrong, please try again later</h1>
    </div>
  )
  return (
    <div className="flex flex-col gap-y-2">
        {data.posts.map((post) => (
            <PostCard key={post.id} post={post} currentDate={currentDate} user={data.users[post.user]} />
        ))}
    </div>
  )
}
