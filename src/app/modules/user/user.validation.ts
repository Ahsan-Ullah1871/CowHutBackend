import { z } from 'zod'
import { user_role } from '../../../constant/common'

export const update_user_zod_schema = z.object({
  body: z.object({
    phoneNumber: z
      .string({ required_error: 'Phone Number  is required' })
      .optional(),

    role: z
      .enum([...user_role] as [string, ...string[]], {
        required_error: 'Role is required',
      })
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
    budget: z
      .number({
        required_error: 'Budget   is required',
      })
      .optional(),
    income: z
      .number({
        required_error: 'Income is required',
      })
      .optional(),
  }),
})
