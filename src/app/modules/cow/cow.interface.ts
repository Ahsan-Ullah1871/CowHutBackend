import { Model, Types } from 'mongoose'
import { ILocations, IUser_role } from '../../../interfaces/common'
import { IUser } from '../user/user.interface'

export type ICowCategories = 'Dairy' | 'Beef' | 'DualPurpose'
export type ICowLabel = 'for sale' | 'sold out'

export type ICow = {
  name: string
  age: number
  price: number
  location: ILocations
  breed: string
  weight: number
  label?: ICowLabel
  category: ICowCategories
  seller: Types.ObjectId | IUser
}

export type CowModel = Model<ICow, object>

export type ICowFilter = {
  minPrice?: string
  maxPrice?: IUser_role
  location?: string
  searchTerm?: string
}
