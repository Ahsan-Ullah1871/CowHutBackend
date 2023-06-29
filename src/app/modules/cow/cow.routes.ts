import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import { CowController } from './cow.controller'
import { create_cow_zod_schema, update_cow_zod_schema } from './cow.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/',
  authHandler('seller'),
  requestValidationHandler(create_cow_zod_schema),
  CowController.createCow
)

router.get('/', authHandler('admin', 'buyer', 'seller'), CowController.allCows)

router.get(
  '/:id',
  authHandler('admin', 'buyer', 'seller'),
  CowController.cowDetails
)

router.patch(
  '/:id',
  authHandler('seller'),
  requestValidationHandler(update_cow_zod_schema),
  CowController.updateCow
)
router.delete('/:id', authHandler('seller'), CowController.deleteCow)

export const CowRoute = router
