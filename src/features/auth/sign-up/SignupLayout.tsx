'use client'
import Form from "@/components/form/Form"
import FormField from "@/components/form/FormField"
import { Button } from "@/components/ui/button"
import { registerSchema, RegisterSchema } from "@/utils/schemas/RegisterSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { signupUser } from "./actions"
import { useState } from "react"

export default function RegisterLayout() {
  const [formError, setFormError] = useState('')
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form

  // const handleRegisterSubmit: SubmitHandler<RegisterSchema> = (data) => {
  //   void fetch(`http://localhost:3000/api/signup`, {
  //     method: 'POST',
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   })
  // }

  const handleRegisterSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      const status = await signupUser(data)
      if(status !== 'Success') throw status
    } catch (error) {
      setFormError(error as string)
    }
  }

  return (
    <Form onSubmit={handleSubmit(handleRegisterSubmit)} className="flex flex-col gap-y-4">
        <FormField label="Email" name="email" register={register('email')} type="email" error={errors.email} />
        <FormField label="Password" name="password" register={register('password')} type="password" error={errors.password} />
        <FormField label="Confirm Password" name="confirm-password" register={register('confirmPassword')} type="password" error={errors.confirmPassword} />
        <div className="w-full">
          {formError && <p className="text-center text-sm text-destructive">{formError}</p>}
          <Button className="font-semibold w-full" disabled={isSubmitting}>
              {isSubmitting? 'Loading...': 'Sign-up'}
          </Button>
        </div>
    </Form>
  )
}
