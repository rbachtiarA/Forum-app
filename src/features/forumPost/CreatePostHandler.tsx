'use client'
import Form from '@/components/form/Form'
import FormField from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { postSchema, PostSchema } from '@/utils/schemas/CreatePostSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { action } from './action'

export default function CreatePostHandler() {
    const form = useForm<PostSchema>({
        resolver: zodResolver(postSchema)
    })
    const { handleSubmit, register, formState: { errors, isSubmitting } } = form

  return (
    <Form onSubmit={handleSubmit(action)} className='flex flex-col gap-y-4'>
        <FormField label='Title' name='post-title' type='text' register={register('title')} error={errors.title} />
        <FormField label='Content' name='post-content' type='text' register={register('content')} error={errors.content}/>
        <Button disabled={isSubmitting}>
            {isSubmitting? 'Creating...': 'Create Post'}
        </Button>
    </Form>
  )
}
