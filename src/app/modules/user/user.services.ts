import httpStatus from 'http-status'
import { pagination_map } from '../../../helpers/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/pagination'
import { filter_user_conditions } from './user.condition'
import { IUser, IUserFilter } from './user.interface'
import { User } from './user.model'
import ApiError from '../../errors/ApiError'

//Get ALl users
const get_all_users = async (
  filers: IUserFilter,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<IUser[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // and conditions (for search and filter)
  const IsConditions = filter_user_conditions(filers) ?? {}

  //
  const all_users = await User.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)

  const total = await User.countDocuments(IsConditions)

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: all_users,
  }
}

//User detail
const get_single_user = async (id: string): Promise<IUser | null> => {
  const isExist = await User.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  //
  const user = await User.findById(id)

  return user
}

// Update user
const update_user = async (
  user_data: Partial<IUser>,
  id: string
): Promise<IUser | null> => {
  const isUserExist: IUser | null = await User.findById(id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // Budget checking
  if (
    isUserExist &&
    isUserExist.role === 'buyer' &&
    (user_data?.budget as number) <= 0
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Budget must be greater than 0 for buyers '
    )
  } else if (
    isUserExist &&
    isUserExist.role === 'seller' &&
    (user_data?.budget as number) > 0
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Budget should be 0 for seller')
  }

  const { name, ...other_user_data } = user_data
  const userData: Partial<IUser> = { ...other_user_data }

  // Name updating handle
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      const name_key = `name.${key}` as keyof Partial<IUser>
      ;(userData as any)[name_key] = name[key as keyof typeof name]
    })
  }

  const updated_user_data = await User.findByIdAndUpdate(id, userData, {
    new: true,
  })

  if (!updated_user_data) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to update user')
  }

  return updated_user_data
}

// Delete user
const delete_user = async (id: string): Promise<IUser | null> => {
  const isExist = await User.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const user = await User.findByIdAndDelete(id)

  if (!user) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to delete user')
  }

  return user
}

export const UserServices = {
  get_all_users,
  get_single_user,
  update_user,
  delete_user,
}
