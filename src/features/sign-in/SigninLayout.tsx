'use client'
import Form from '@/components/form/Form'
import FormField from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { loginSchema, LoginSchema } from '@/utils/schemas/LoginSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function SigninLayout() {
    const form = useForm<LoginSchema>({
      resolver: zodResolver(loginSchema)
    })
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = form
    
    const [showPassword, setShowPassword] = useState(false)

    const handleLoginSubmit: SubmitHandler<LoginSchema> = (data) => {
      alert(data.email)
      console.log(data);
    }
  return (
    <Form onSubmit={handleSubmit(handleLoginSubmit)} className='flex flex-col gap-y-4'>
      <FormField label='Email' name='email' type='email' register={register('email')} error={errors.email}/>
      <FormField label='Password' name='password' type={showPassword? 'text': 'password'} register={register('password')} error={errors.password}/>
      <div className='flex justify-between text-sm text-muted-foreground'>
        <div className='flex items-center gap-x-2'>
          <Checkbox id='show-password' checked={showPassword} onCheckedChange={() => setShowPassword(!showPassword)}/>
          <label htmlFor="show-password">Show password</label>
        </div>
        <Link href={'/sign-in?con=forgot-pass'} className='italic'>Forget password ?</Link>
      </div>
      <Button disabled={isSubmitting} className='font-semibold'>
        {isSubmitting? "Loading..." : "Login"}
      </Button>
    </Form>
  
  )
}
