import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { OrderServices } from './order.services'

// Create Order
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...order_data } = req.body
  const result = await OrderServices.create_new_order(order_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Order created successfully',
  })
})

//  Get all orders
const allOrders = catchAsync(async (req: Request, res: Response) => {
  const { ...logged_in_user_data } = req.logged_in_user

  const result = await OrderServices.gel_all_orders(logged_in_user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Orders retrieved successfully',
  })
})

export const OrderController = {
  createOrder,
  allOrders,
}
