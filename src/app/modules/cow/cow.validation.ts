import { z } from 'zod'
import { cow_categories, cow_label } from './cow.constant'
import { locations } from '../../../constant/common'

export const create_cow_zod_schema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    age: z
      .number({ required_error: 'Age is required' })
      .refine(value => value > 0, {
        message: 'Age must be greater than 0',
      }),
    price: z
      .number({ required_error: 'Price is required' })
      .refine(value => value > 0, {
        message: 'Price must be greater than 0',
      }),
    location: z.enum([...locations] as [string, ...string[]], {
      required_error: 'Location is required',
    }),
    breed: z.string({ required_error: 'Breed is required' }),
    weight: z
      .number({ required_error: 'Weight is required' })
      .refine(value => value > 0, {
        message: 'Weight must be greater than 0',
      }),
    label: z
      .enum([...cow_label] as [string, ...string[]], {
        required_error: 'Label is required',
      })
      .refine(value => value === 'for sale', {
        message: 'At first time label should be "for sale"',
      })
      .optional(),
    category: z.enum([...cow_categories] as [string, ...string[]], {
      required_error: 'Category is required',
    }),
    seller: z.string({ required_error: 'Seller is required' }),
  }),
})

export const update_cow_zod_schema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    age: z
      .number({ required_error: 'Age is required' })
      .refine(value => value > 0, {
        message: 'Age must be greater than 0',
      })
      .optional(),
    price: z
      .number({ required_error: 'Price is required' })
      .refine(value => value > 0, {
        message: 'Price must be greater than 0',
      })
      .optional(),
    location: z
      .enum([...locations] as [string, ...string[]], {
        required_error: 'Location is required',
      })
      .optional(),
    breed: z.string({ required_error: 'Breed is required' }).optional(),
    weight: z
      .number({ required_error: 'Weight is required' })
      .refine(value => value > 0, {
        message: 'Weight must be greater than 0',
      })
      .optional(),
    label: z
      .enum([...cow_label] as [string, ...string[]], {
        required_error: 'Label is required',
      })
      .optional(),
    category: z
      .enum([...cow_categories] as [string, ...string[]], {
        required_error: 'Category is required',
      })
      .optional(),
    seller: z.string({ required_error: 'Seller is required' }).optional(),
  }),
})
