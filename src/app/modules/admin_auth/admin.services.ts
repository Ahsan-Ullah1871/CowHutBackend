import httpStatus from 'http-status'
import { IAdmin, IAdminLogin, IAdminLoginResponse } from './admin.interface'
import { Admin } from './admin.model'
import ApiError from '../../errors/ApiError'
import { jwtHelper } from '../../../helpers/jwtHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

// Create new admin
const admin_signup = async (
  admin_data: IAdmin
): Promise<Partial<IAdmin> | null> => {
  const created_user = await Admin.create(admin_data)
  const userWithoutPassword: Partial<IAdmin> = created_user.toObject()
  delete userWithoutPassword.password

  return userWithoutPassword
}

// login admin
const admin_login = async (
  login_data: IAdminLogin
): Promise<IAdminLoginResponse | null> => {
  const { phoneNumber, password } = login_data

  // Admin checking
  const isAdminExist = await Admin.isAdminExist(phoneNumber)

  if (!isAdminExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin not found')
  }

  const { password: admin_encrypted_password, ...othersUserData } = isAdminExist

  // match password;
  if (
    isAdminExist &&
    admin_encrypted_password &&
    !(await Admin.isPasswordMatched(admin_encrypted_password, password))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid password')
  }

  // access token
  const accessToken = jwtHelper.create_token(
    { _id: othersUserData?._id, role: othersUserData?.role },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expiresIn as string
  )
  // refresh token
  const refreshToken = jwtHelper.create_token(
    { _id: othersUserData?._id, role: othersUserData?.role },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expiresIn as string
  )

  return { accessToken, refreshToken }
}

export const AdminAuthServices = {
  admin_signup,
  admin_login,
}
