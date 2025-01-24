import z from 'zod'
import { emailSchema, passwordSchema } from './schema'

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export const forgetPassword = z.object({
    email: emailSchema
})

export type LoginSchema = z.infer<typeof loginSchema>
export type ForgetPassword = z.infer<typeof forgetPassword>