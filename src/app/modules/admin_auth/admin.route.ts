import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import {
  admin_login_zod_schema,
  admin_refresh_token_zod_schema,
  admin_signup_zod_schema,
  update_admin_profile_zod_schema,
} from './admin.validation'
import { AdminAuthController } from './admin.controller'
import authHandler from '../../middlewares/authHandler'

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

router.post(
  '/refresh-token',
  requestValidationHandler(admin_refresh_token_zod_schema),
  AdminAuthController.refreshToken
)

router.get(
  '/my-profile',
  authHandler('admin'),
  AdminAuthController.adminProfile
)
router.patch(
  '/my-profile',
  authHandler('admin'),
  requestValidationHandler(update_admin_profile_zod_schema),
  AdminAuthController.updateAdminProfile
)

export const AdminAuthRoute = router
