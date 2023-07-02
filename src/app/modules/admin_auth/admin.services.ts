import httpStatus from 'http-status'
import { IAdmin, IAdminLogin, IAdminLoginResponse } from './admin.interface'
import { Admin } from './admin.model'
import ApiError from '../../errors/ApiError'
import { jwtHelper } from '../../../helpers/jwtHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import { hashingHelper } from '../../../helpers/hashingHelper'

// Create new admin
const admin_signup = async (
  admin_data: IAdmin
): Promise<Partial<IAdmin> | null> => {
  const created_admin = await Admin.create(admin_data)
  const adminWithoutPassword: Partial<IAdmin> = created_admin.toObject()
  delete adminWithoutPassword.password

  return adminWithoutPassword
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

  const { password: admin_encrypted_password, ...othersAdminData } =
    isAdminExist

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
    { _id: othersAdminData?._id, role: othersAdminData?.role },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expiresIn as string
  )
  // refresh token
  const refreshToken = jwtHelper.create_token(
    { _id: othersAdminData?._id, role: othersAdminData?.role },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expiresIn as string
  )

  return { accessToken, refreshToken }
}

//MY  profile
const my_profile = async (id: string): Promise<Partial<IAdmin> | null> => {
  const isExist = await Admin.findById(id, {
    name: 1,
    phoneNumber: 1,
    address: 1,
  })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found')
  }

  return isExist
}
// update__profile
const update_profile = async (
  admin_data: Partial<IAdmin>,
  id: string
): Promise<IAdmin | null> => {
  const isAdminExist: IAdmin | null = await Admin.findById(id)

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found')
  }

  const { name, password, phoneNumber, ...other_admin_data } = admin_data
  const adminData: Partial<IAdmin> = { ...other_admin_data, phoneNumber }

  // Name updating handle
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      const name_key = `name.${key}` as keyof Partial<IAdmin>
      ;(adminData as any)[name_key] = name[key as keyof typeof name]
    })
  }

  // phone  updating handle
  if (phoneNumber && (await Admin.isPhoneNumberExist(phoneNumber))) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Already same number used for a admin'
    )
  }

  // password  updating handle
  if (password) {
    adminData.password = await hashingHelper.encrypt_password(password)
  }

  const updated_admin_data = await Admin.findByIdAndUpdate(id, adminData, {
    new: true,
    projection: { name: 1, phoneNumber: 1, address: 1, _id: 0 },
  })

  if (!updated_admin_data) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to update admin')
  }

  return updated_admin_data
}

export const AdminAuthServices = {
  admin_signup,
  admin_login,
  my_profile,
  update_profile,
}
