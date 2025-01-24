import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import CreatePostHandler from './CreatePostHandler'

export default function CreatePostLayout() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Create a new post
            </CardTitle>
        </CardHeader>
        <CardContent>
            <CreatePostHandler />
        </CardContent>
    </Card>
  )
}
