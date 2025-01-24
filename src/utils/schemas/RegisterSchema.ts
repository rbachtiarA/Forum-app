import z from 'zod'
import { emailSchema, passwordSchema } from './schema'

export const registerSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string()
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"]
})

export type RegisterSchema = z.infer<typeof registerSchema>