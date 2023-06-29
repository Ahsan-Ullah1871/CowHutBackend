import express from 'express'
import { UserController } from './user.controller'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { update_user_zod_schema } from './user.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.get('/', authHandler('admin'), UserController.allUsers)

router.get('/:id', authHandler('admin'), UserController.userDetail)

router.patch(
  '/:id',
  authHandler('admin'),
  requestValidationHandler(update_user_zod_schema),
  UserController.updateUser
)
router.delete('/:id', authHandler('admin'), UserController.deleteUser)

export const UserRoute = router
