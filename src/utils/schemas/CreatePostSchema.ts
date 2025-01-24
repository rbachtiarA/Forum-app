import z from 'zod'

export const postSchema = z.object({
    title: z.string().min(3, 'Field need atleast 3 characters').max(20, 'Maximum text is 20 characters'),
    content: z.string().min(3, 'Field need atleast 3 characters').max(20, 'Maximum text is 20 characters')
}).required()

export type PostSchema = z.infer<typeof postSchema>