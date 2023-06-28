import { z } from 'zod'
import { user_role } from '../../../constant/common'

export const user_signup_zod_schema = z.object({
  body: z
    .object({
      phoneNumber: z.string({ required_error: 'Phone Number  is required' }),
      role: z.enum([...user_role] as [string, ...string[]], {
        required_error: 'Role is required',
      }),
      password: z.string({ required_error: 'Password  is required' }),
      name: z.object({
        firstName: z.string({ required_error: 'First name is required' }),
        lastName: z.string().optional(),
      }),
      address: z.string({
        required_error: 'Present address is required',
      }),
      budget: z
        .number({
          required_error: 'Budget   is required',
        })
        .optional(),
      income: z
        .number({
          required_error: 'Income is required',
        })
        .refine(val => val < 1 && val >= 0, {
          message:
            ' Invalid income. The income value should be 0, as this program does not support positive income entries.',
        })
        .optional(),
    })
    .superRefine((val, ctx) => {
      if (
        val.role === 'buyer' &&
        ((val?.budget as number) <= 0 || val?.budget === undefined)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Budget must be greater than 0 for buyers ',
          fatal: true,
        })
      } else if (val.role === 'seller' && (val?.budget as number) > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Budget should be 0 for seller',
          fatal: true,
        })
      }
    }),
})

export const user_login_zod_schema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: 'Phone Number  is required' }),
    password: z.string({ required_error: 'Password  is required' }),
  }),
})

export const user_refresh_token_zod_schema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token  is required' }),
  }),
})
