'use client'
import Form from '@/components/form/Form'
import FormField from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { changePasswordSchema, ChangePasswordSchema } from '@/utils/schemas/ChangePasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { profileUpdatePassword } from '../../action'

export default function FormResetPassword() {
    const form = useForm<ChangePasswordSchema>({
      resolver: zodResolver(changePasswordSchema)
    })
    
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form
    const [formStatus, setFormStatus] = useState<'SUCCESS' | 'ERROR' | null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const handleLoginSubmit: SubmitHandler<ChangePasswordSchema> = async (data) => {
      setFormStatus(null)  
      const { error } = await profileUpdatePassword(data.password)
      if(error) {
        setFormStatus('ERROR')
      } else {
        reset()
        setFormStatus('SUCCESS')
      }
      
    }

  return (
    <Form onSubmit={handleSubmit(handleLoginSubmit)} className='flex flex-col gap-y-4'>
      <FormField label='New password' name='password' type={showPassword? 'text': 'password'} register={register('password')} error={errors.password}/>
      <FormField label='Confirm new password' name='confirmPassword' type={showPassword? 'text': 'password'} register={register('confirmPassword')} error={errors.confirmPassword}/>
      <div className='flex justify-between text-sm text-muted-foreground'>
        <div className='flex items-center gap-x-2'>
          <Checkbox id='show-password' checked={showPassword} onCheckedChange={() => setShowPassword(!showPassword)}/>
          <label htmlFor="show-password">Show password</label>
        </div>
      </div>
      <div className='flex flex-col gap-y-2'>
        { 
            formStatus && 
            <p className={`${formStatus === 'ERROR' ? 'text-destructive' : 'text-primary'} text-center`}>
                {
                    formStatus === 'ERROR' ?
                    `Error when handling request` :
                    `Success reset password`
                }
            </p>
        }
        <Button disabled={isSubmitting} className='font-semibold'>
            {isSubmitting? "proccessing..." : "Change password"}
        </Button>
      </div>
    </Form>
  
  )
}
