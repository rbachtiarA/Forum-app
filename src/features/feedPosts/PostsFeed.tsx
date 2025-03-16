'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { feedAPIOptions } from './feedQueries'
import PostCard from './PostCard'

export function PostsFeed() {
  const currentDate = new Date()
  // const { data, isError, isLoading } = useQuery(postsOptions)
  const { data, isError, isLoading } = useQuery(feedAPIOptions())      
    
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
          {data.posts.map((post) => (
                <PostCard key={post.id} post={post} currentDate={currentDate} user={data.users[post.user]}/> 
            ))}
        </div>
        // <div className='flex flex-col gap-y-2 mt-2'>
        //   {data.posts.map((post) => (
        //     <div key={post.id}>
        //       <h1 className='font-bold text-xl'>{post.title}</h1>
        //       <p className=''>{post.content}</p>
        //       <div>
        //         <p>{data.users[post.user].name}</p>
        //       </div>
        //     </div>
        //   )) }
        // </div>
      }

    </>
  )
}