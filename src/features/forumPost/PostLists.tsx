'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { postsOptions } from './postQueries'
import PostTemplate from './PostTemplate'

export function PostLists() {
  const currentDate = new Date()
  const { data, isError, isLoading } = useQuery(postsOptions)

      
    
  return (
    <>
      {
        isError && 
        <div>
          <h1>500 : Internal Server Error</h1>
          <h2>Something is wrong, wait for our staff to fix it</h2>
        </div>
      }
      {
        isLoading && 
        <div>
          Fetching Data...
        </div>
      }
      {
        data &&
        <div className='flex flex-col gap-y-2 mt-2'>
          {data.map((post) => (
                <PostTemplate key={post.id} post={post} currentDate={currentDate}/> 
            ))}
        </div>
      }

    </>
  )
}