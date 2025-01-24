import { z } from "zod";

export const emailSchema = z.string().email()
export const passwordSchema = z.string().min(8, 'Atleast 8 minimum letters').regex(/[a-z]/, 'Need contains 1 lowercase').regex(/[A-Z]/, 'Need contains 1 uppercase').regex(/[0-9]/, 'Need contains 1 digit')