import { pagination_map } from '../../../helpers/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/pagination'
import { filter_cow_conditions } from './cow.condition'
import ApiError from '../../errors/ApiError'
import { ICow, ICowFilter } from './cow.interface'
import { Cow } from './cow.model'
import { User } from '../user/user.model'
import { IUser } from '../user/user.interface'
import httpStatus from 'http-status'

// Create new Cow
const create_new_cow = async (cow_data: ICow): Promise<ICow | null> => {
  // seller checking
  const isSellerExist: IUser | null = await User.findById(cow_data.seller)
  if (!isSellerExist || isSellerExist?.role !== 'seller') {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found')
  }

  // label value checking
  if (!cow_data?.label) {
    cow_data.label = 'for sale'
  }

  const created_cow = await Cow.create(cow_data)

  return created_cow
}

//  gel_all_cows
const gel_all_cows = async (
  filers: ICowFilter,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<ICow[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // and conditions (for search and filter)
  const IsConditions = filter_cow_conditions(filers) ?? {}

  //
  const all_cows = await Cow.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)

  const total = await Cow.countDocuments(IsConditions)

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: all_cows,
  }
}

//cow detail
const get_cow_details = async (id: string): Promise<ICow | null> => {
  const isExist = await Cow.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found')
  }

  //
  const cow_details = await Cow.findById(id)

  return cow_details
}

// Update cow
const update_cow = async (
  cow_data: Partial<ICow>,
  id: string
): Promise<ICow | null> => {
  const isExist = await Cow.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found')
  }

  // seller checking
  if (cow_data?.seller) {
    const isSellerExist: IUser | null = await User.findById(cow_data.seller)

    if (!isSellerExist || isSellerExist?.role !== 'seller') {
      throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found')
    }
  }

  const updated_cow_data = await Cow.findByIdAndUpdate(id, cow_data, {
    new: true,
  })

  if (!updated_cow_data) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to update cow data'
    )
  }

  return updated_cow_data
}

//  Delete cow
const delete_cow = async (id: string): Promise<ICow | null> => {
  const isExist = await Cow.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found')
  }

  const cow = await Cow.findByIdAndDelete(id)

  if (!cow) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to delete cow')
  }

  return cow
}

export const CowServices = {
  create_new_cow,
  update_cow,
  gel_all_cows,
  get_cow_details,
  delete_cow,
}
