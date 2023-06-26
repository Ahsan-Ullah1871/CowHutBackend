import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import { OrderController } from './order.controller'
import { create_order_zod_schema } from './order.validation'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(create_order_zod_schema),
  OrderController.createOrder
)

router.get('/', OrderController.allOrders)

export const OrderRoute = router
