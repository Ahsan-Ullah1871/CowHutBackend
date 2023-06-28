import { Model, Types } from 'mongoose'
import { IUser_role } from '../../../interfaces/common'

export type IName = {
  firstName: string
  lastName: string
}

export type IAdmin = {
  _id?: Types.ObjectId
  phoneNumber: string
  role: IUser_role
  password: string
  name: IName
  address: string
}

export type AdminModel = {
  isAdminExist(phoneNumber: string): Promise<IAdmin | null>
  isPasswordMatched(
    encrypted_pass: string,
    given_pass: string
  ): Promise<boolean>
} & Model<IAdmin>

// admin login interface
export type IAdminLogin = {
  phoneNumber: string
  password: string
}

export type IAdminLoginResponse = {
  accessToken: string
  refreshToken?: string
}
