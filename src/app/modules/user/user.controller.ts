import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { UserServices } from './user.services'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { user_filter_keys } from './user.constant'
import { pagination_keys } from '../../../constant/common'
import pick from '../../../shared/pick'

//updateUser
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const { ...user_data } = req.body
  const result = await UserServices.update_user(user_data, id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'User updated successfully',
  })
})

// Get all users
const allUsers = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, user_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await UserServices.get_all_users(filers, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Users retrieved successfully',
  })
})

// Get   user Details
const userDetail = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await UserServices.get_single_user(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'User details retrieved successfully',
  })
})

// Get   user profile information
const userProfile = catchAsync(async (req: Request, res: Response) => {
  const { _id: user_id } = req.logged_in_user

  const result = await UserServices.my_profile(user_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: "User's information retrieved successfully",
  })
})

// userProfileUpdate
const userProfileUpdate = catchAsync(async (req: Request, res: Response) => {
  const { _id: user_id } = req.logged_in_user
  const { ...user_data } = req.body
  const result = await UserServices.update_user_profile(user_data, user_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: "User's information updated successfully",
  })
})

// Delete   user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await UserServices.delete_user(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'User deleted successfully',
  })
})

export const UserController = {
  updateUser,
  allUsers,
  userDetail,
  deleteUser,
  userProfile,
  userProfileUpdate,
}
