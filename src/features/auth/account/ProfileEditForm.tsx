'use client'
import Form from '@/components/form/Form'
import FormField from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { useUserProfile } from '@/hooks/useUserProfile'
import { profileEditSchema, ProfileEditSchema } from '@/utils/schemas/ProfileEditSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { updateUserProfile } from '../action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function ProfileEditForm() {
    const queryClient = useQueryClient()
    const { data } = useUserProfile()
    const { 
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
     } = useForm<ProfileEditSchema>({
        resolver: zodResolver(profileEditSchema),
    })
    
    useEffect(() => {
        if(data) {
            reset({
                username: data.username,
                bio: data.bio??undefined,
                name: data.name??undefined,
            })
        }
    }, [data, reset])

    const { mutateAsync } = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['userProfile']
            })
        }
    })

    const onReset = () => {
        if(data) {
            reset({
                username: data.username,
                bio: data.bio??undefined,
                name: data.name??undefined,
            })
        }
    }

    const onSubmit = async (data: ProfileEditSchema) => {
        mutateAsync(data)
        alert('success update')
    }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-full justify-between gap-y-2'>
        <FormField register={register('username')} label='Username' name='username' error={errors.username} type='text' />
        <FormField register={register('name')} label='Display name' name='name' error={errors.name} type='text' />
        <FormField register={register('bio')} label='Bio status' name='bio' error={errors.bio} type='textarea' placeholder='Insert your interest'/>
        <div className='flex gap-x-2'>
            <Button onClick={onReset} disabled={!isDirty} variant={'destructive'} type='button'>
                Reset
            </Button>
            <Button disabled={!isDirty} type='submit'>
                Save
            </Button>   
        </div>
    </Form>
  )
}
