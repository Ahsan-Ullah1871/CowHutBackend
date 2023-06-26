import { Model } from 'mongoose'
import { IUser_role } from '../../../interfaces/common'

export type IName = {
  firstName: string
  lastName: string
}

export type IUser = {
  phoneNumber: string
  role: IUser_role
  password: string
  name: IName
  address: string
  budget?: number
  income?: number
}

// Create a new Model type that knows about IUserMethods when available here...
export type UserModel = Model<IUser, object>

// User filter type
export type IUserFilter = {
  phoneNumber?: string
  role?: IUser_role
  address?: string
  searchTerm?: string
}
