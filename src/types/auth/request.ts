import * as z from 'zod'
import { LoginSchema, RegisterSchema } from '@/schemas/auth/requests'

export type LoginType = z.infer<typeof LoginSchema>;

export type RegisterType = z.infer<typeof RegisterSchema>;