import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import { OrderController } from './order.controller'
import { create_order_zod_schema } from './order.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/',
  authHandler('buyer'),
  requestValidationHandler(create_order_zod_schema),
  OrderController.createOrder
)

router.get(
  '/',
  authHandler('buyer', 'admin', 'seller'),
  OrderController.allOrders
)

export const OrderRoute = router
