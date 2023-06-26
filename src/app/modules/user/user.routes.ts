import express from 'express'
import { UserController } from './user.controller'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { update_user_zod_schema } from './user.validation'

const router = express.Router()

router.get('/', UserController.allUsers)

router.get('/:id', UserController.userDetail)

router.patch(
  '/:id',
  requestValidationHandler(update_user_zod_schema),
  UserController.updateUser
)
router.delete('/:id', UserController.deleteUser)

export const UserRoute = router
