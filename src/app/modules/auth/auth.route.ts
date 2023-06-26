import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { AuthController } from './auth.controller'
import { user_signup_zod_schema } from './auth.validation'
import express from 'express'

const router = express.Router()

router.post(
  '/signup',
  requestValidationHandler(user_signup_zod_schema),
  AuthController.signupUser
)

export const AuthRoute = router
