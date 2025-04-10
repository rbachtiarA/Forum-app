import z from 'zod'
import { bioSchema, nameSchema, usernameSchema } from './schema'

export const profileEditSchema = z.object({
    username: usernameSchema,
    name: nameSchema,
    bio: bioSchema
})

export type ProfileEditSchema = z.infer<typeof profileEditSchema>