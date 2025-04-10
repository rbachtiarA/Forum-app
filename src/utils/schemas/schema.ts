import { z } from "zod";

const MB_BYTES = 1000000 // 1 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const emailSchema = z.string().email()
export const passwordSchema = z.string().min(8, 'Atleast 8 minimum letters').regex(/[a-z]/, 'Need contains 1 lowercase').regex(/[A-Z]/, 'Need contains 1 uppercase').regex(/[0-9]/, 'Need contains 1 digit')
export const usernameSchema = z.string().trim().min(6, 'Username minimum length have 6 characters')
export const nameSchema = z.string().trim().min(2, 'Display name must have atleast 2 length charachters')
export const bioSchema = z.string().optional()
export const imageSchema = z.instanceof(File).superRefine(
    (file, ctx) => {
        if(!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `File must be on of [${ACCEPTED_IMAGE_TYPES.join(', ')}] but was ${file.type}`
            })
        }

        if(file.size > 1 * MB_BYTES) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_big,
                type: 'array',
                message: `The file must not large that ${1 * MB_BYTES}: ${file.size}`,
                maximum: 1 * MB_BYTES,
                inclusive: true
            })
        }
    }
)
export const imageUrlSchema = z.string()