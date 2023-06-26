import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import { CowController } from './cow.controller'
import { create_cow_zod_schema, update_cow_zod_schema } from './cow.validation'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(create_cow_zod_schema),
  CowController.createCow
)

router.get('/', CowController.allCows)

router.get('/:id', CowController.cowDetails)

router.patch(
  '/:id',
  requestValidationHandler(update_cow_zod_schema),
  CowController.updateCow
)
router.delete('/:id', CowController.deleteCow)

export const CowRoute = router
