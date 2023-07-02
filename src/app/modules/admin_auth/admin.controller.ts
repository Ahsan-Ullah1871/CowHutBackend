import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { AdminAuthServices } from './admin.services'
import { IAdmin, IAdminLoginResponse } from './admin.interface'

const signupAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...admin_data } = req.body
  const result = await AdminAuthServices.admin_signup(admin_data)

  sendResponse<Partial<IAdmin>, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Admin created successfully',
  })
})

//
const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...login_data } = req.body
  const result = await AdminAuthServices.admin_login(login_data)

  const accessToken = result?.accessToken as string
  const refreshToken = result?.refreshToken as string

  // cookies options
  const options = {
    httpOnly: true,
    secure: false,
  }

  res.cookie('refreshToken', refreshToken, options)

  sendResponse<IAdminLoginResponse, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: { accessToken },
    message: 'Admin logged in successfully',
  })
})

// Get  profile information
const adminProfile = catchAsync(async (req: Request, res: Response) => {
  const { _id: admin_id } = req.logged_in_user

  const result = await AdminAuthServices.my_profile(admin_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: "Admin's information retrieved successfully",
  })
})

// ProfileUpdate
const updateAdminProfile = catchAsync(async (req: Request, res: Response) => {
  const { _id: admin_id } = req.logged_in_user
  const { ...admin_data } = req.body
  const result = await AdminAuthServices.update_profile(admin_data, admin_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: "Admin's information updated successfully",
  })
})

// refreshToken
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await AdminAuthServices.refresh_token(refreshToken)

  const accessToken = result?.accessToken as string
  const newRefreshToken = result?.refreshToken as string

  // cookies options
  const options = {
    httpOnly: true,
    secure: false,
  }

  res.cookie('refreshToken', newRefreshToken, options)

  sendResponse<IAdminLoginResponse, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: { accessToken },
    message: 'New access token generated successfully !',
  })
})

export const AdminAuthController = {
  signupAdmin,
  loginAdmin,
  adminProfile,
  updateAdminProfile,
  refreshToken,
}
