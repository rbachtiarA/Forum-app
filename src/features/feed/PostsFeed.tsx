'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { feedAPIOptions } from './feedQueries'
import PostCard from './PostCard'

export default function PostsFeed({username} :{ username?: string }) {
  const currentDate = new Date()
  const { data, isError, isLoading } = useQuery(feedAPIOptions(username))      
    
  if(isLoading) return (
    <div>
      Fetching Data...
    </div> 
  )

  if(isError || !data) return (
    <div>
      <h1>500 : Internal Server Error</h1>
      <h2>Something is wrong, wait for our staff to fix it</h2>
    </div>
  )

  if(data?.posts.length === 0) return (
    <div>
      <h1>{username ? 'User has not post anything yet' : 'There is no post to show'}</h1>
    </div>
  )

  return (
    <>      
      {
        data &&
        <div className='flex flex-col gap-y-2 mt-2'>
          {
            data.posts.map((post) => (
                <PostCard key={post.id} post={post} currentDate={currentDate} user={data.users[post.user]}/> 
            ))
          }
        </div>
      }
    </>
  )
}