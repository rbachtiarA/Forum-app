import z from 'zod'
import { bioSchema, displayNameSchema, imageUrlSchema, usernameSchema } from './schema'

export const profileEditSchema = z.object({
    username: usernameSchema,
    displayName: displayNameSchema,
    picture: imageUrlSchema,
    bio: bioSchema
})

export type ProfileEditSchema = z.infer<typeof profileEditSchema>