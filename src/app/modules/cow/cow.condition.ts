import { cow_search_condition_keys } from './cow.constant'
import { ICowFilter } from './cow.interface'

export const filter_cow_conditions = (
  filers: ICowFilter
): { [key: string]: Array<Record<string, any>> } | undefined => {
  const { searchTerm, ...filter_keys } = filers

  const conditions = []

  if (searchTerm) {
    conditions.push({
      $or: cow_search_condition_keys.map(item => ({
        [item]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  //
  if (Object.keys(filter_keys).length) {
    conditions.push({
      $and: Object.entries(filter_keys).map(([key, value]) => {
        if (key === 'minPrice') {
          return { price: { $gte: value } }
        } else if (key === 'maxPrice') {
          return { price: { $lte: value } }
        } else {
          return { [key]: value }
        }
      }),
    })
  }

  return conditions?.length > 0 ? { $and: conditions } : undefined
}
