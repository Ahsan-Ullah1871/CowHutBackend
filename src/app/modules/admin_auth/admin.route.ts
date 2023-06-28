import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import {
  admin_login_zod_schema,
  admin_signup_zod_schema,
} from './admin.validation'
import { AdminAuthController } from './admin.controller'

const router = express.Router()

router.post(
  '/create-admin',
  requestValidationHandler(admin_signup_zod_schema),
  AdminAuthController.signupAdmin
)

router.post(
  '/login',
  requestValidationHandler(admin_login_zod_schema),
  AdminAuthController.loginAdmin
)

export const AdminAuthRoute = router
