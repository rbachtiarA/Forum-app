import z from 'zod'
import { passwordSchema } from './schema'

export const changePasswordSchema = z.object({
    password: passwordSchema,
    confirmPassword: z.string()
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"]
})

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>