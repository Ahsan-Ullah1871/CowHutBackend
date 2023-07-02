import { z } from 'zod'
import { user_role } from '../../../constant/common'

export const admin_signup_zod_schema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: 'Phone Number  is required' }),
    role: z
      .enum([...user_role] as [string, ...string[]])
      .refine(value => value === 'admin', {
        message: "Role must be 'admin'",
      }),
    password: z.string({ required_error: 'Password  is required' }),
    name: z.object({
      firstName: z.string({ required_error: 'First name is required' }),
      lastName: z.string().optional(),
    }),
    address: z.string({
      required_error: 'Present address is required',
    }),
  }),
})

export const admin_login_zod_schema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: 'Phone Number  is required' }),
    password: z.string({ required_error: 'Password  is required' }),
  }),
})

export const update_admin_profile_zod_schema = z.object({
  body: z.object({
    phoneNumber: z
      .string({ required_error: 'Phone Number  is required' })
      .optional(),

    password: z.string({ required_error: 'Password  is required' }).optional(),
    name: z
      .object({
        firstName: z
          .string({ required_error: 'First name is required' })
          .optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    address: z
      .string({
        required_error: 'Present address is required',
      })
      .optional(),
  }),
})

export const admin_refresh_token_zod_schema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token  is required' }),
  }),
})
