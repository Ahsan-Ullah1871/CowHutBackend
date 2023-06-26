import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { AuthServices } from './auth.services'

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user_data } = req.body
  const result = await AuthServices.user_signup(user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'User signed up successfully',
  })
})

export const AuthController = {
  signupUser,
}
