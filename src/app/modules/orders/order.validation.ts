import { z } from 'zod'

export const create_order_zod_schema = z.object({
  body: z.object({
    cow: z.string({ required_error: 'Cow is required' }),
    buyer: z.string({ required_error: 'Buyer is required' }),
  }),
})
