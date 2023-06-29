import { UserModel } from './user.interface'
import { Model, Types } from 'mongoose'
import { IUser_role } from '../../../interfaces/common'

export type IName = {
  firstName: string
  lastName: string
}

export type IUser = {
  _id?: Types.ObjectId
  phoneNumber: string
  role: IUser_role
  password: string
  name: IName
  address: string
  budget?: number
  income?: number
}

// Create a new Model type that knows about IUserMethods when available here...
export type UserModel = {
  isUserExist(phoneNumber: string): Promise<IUser | null>
  isUserExistByID(_id: Types.ObjectId): Promise<IUser | null>
  isPasswordMatched(
    encrypted_pass: string,
    given_pass: string
  ): Promise<boolean>
  isPhoneNumberExist(phoneNumber: string): Promise<boolean>
} & Model<IUser>

// User filter type
export type IUserFilter = {
  phoneNumber?: string
  role?: IUser_role
  address?: string
  searchTerm?: string
}

// user login interface
export type IUserLogin = {
  phoneNumber: string
  password: string
}

export type IUserLoginResponse = {
  accessToken: string
  refreshToken?: string
}
