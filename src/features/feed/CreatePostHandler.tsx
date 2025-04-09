'use client'
import Form from '@/components/form/Form'
import FormField from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { postSchema, PostSchema } from '@/utils/schemas/CreatePostSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createPost } from './action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function CreatePostHandler() {
    const queryClient = useQueryClient()
    const form = useForm<PostSchema>({
      resolver: zodResolver(postSchema)
  })
    const { handleSubmit, register, formState: { errors }, reset } = form
    const { mutateAsync, isPending } = useMutation({
      mutationFn: async (data: PostSchema) => {
        await createPost(data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] })
        reset()
      },
      onError: () => {
        console.log('Error Creating Posts')
      }
    })
    

    const onSubmit = (data: PostSchema) => {
      mutateAsync(data)
    }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <FormField label='Title' name='post-title' type='text' register={register('title')} error={errors.title} />
        <FormField label='Content' name='post-content' type='text' register={register('content')} error={errors.content}/>
        <Button disabled={isPending}>
            {isPending? 'Creating...': 'Create Post'}
        </Button>
    </Form>
  )
}
