'use client'
import Form from "@/components/form/Form"
import FormField from "@/components/form/FormField"
import { Button } from "@/components/ui/button"
import { registerSchema, RegisterSchema } from "@/utils/schemas/RegisterSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

export default function RegisterLayout() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form

  const handleRegisterSubmit: SubmitHandler<RegisterSchema> = (data) => {
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit(handleRegisterSubmit)} className="flex flex-col gap-y-4">
        <FormField label="Email" name="email" register={register('email')} type="email" error={errors.email} />
        <FormField label="Password" name="password" register={register('password')} type="password" error={errors.password} />
        <FormField label="Confirm Password" name="confirm-password" register={register('confirmPassword')} type="password" error={errors.confirmPassword} />
        <Button className="font-semibold">
            {isSubmitting? 'Loading...': 'Sign-up'}
        </Button>
    </Form>
  )
}
