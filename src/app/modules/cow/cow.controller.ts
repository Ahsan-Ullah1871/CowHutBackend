import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CowServices } from './cow.services'
import pick from '../../../shared/pick'
import { cow_filter_keys } from './cow.constant'
import { pagination_keys } from '../../../constant/common'

// Create cow
const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cow_data } = req.body
  const result = await CowServices.create_new_cow(cow_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Cow created successfully',
  })
})

// //updateCow
const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id: cow_id } = req.params
  const { _id: seller_id } = req.logged_in_user

  const { ...cow_data } = req.body
  const result = await CowServices.update_cow(cow_data, cow_id, seller_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Cow updated successfully',
  })
})

// // Get all cows
const allCows = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, cow_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await CowServices.gel_all_cows(filers, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Cows retrieved successfully',
  })
})

// // Get   Cow Details
const cowDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await CowServices.get_cow_details(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Cow details retrieved successfully',
  })
})

// // Delete   Cow
const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id: cow_id } = req.params
  const { _id: seller_id } = req.logged_in_user
  const result = await CowServices.delete_cow(cow_id, seller_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Cow deleted successfully',
  })
})

export const CowController = {
  createCow,
  updateCow,
  allCows,
  cowDetails,
  deleteCow,
}
