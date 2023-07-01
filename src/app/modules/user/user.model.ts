import { Schema, Types, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import { user_role } from '../../../constant/common'
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import bcrypt from 'bcrypt'
import config from '../../../config'

// And a schema that knows about IUserMethods
const UserSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: user_role },
    password: { type: String, required: true, select: 0 },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

//isUserExist  static method finding by user phoneNumber
UserSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { phoneNumber },
    { _id: 1, role: 1, password: 1, phoneNumber: 1 }
  ).lean()
}
//isUserExist  static method finding by user _id
UserSchema.statics.isUserExistByID = async function (
  _id: Types.ObjectId | string
): Promise<Partial<IUser> | null> {
  return await User.findById(_id).lean()
}

//isPhone Number Exist
UserSchema.statics.isPhoneNumberExist = async function (
  phoneNumber: string
): Promise<boolean> {
  const isExist = await User.findOne({
    phoneNumber: phoneNumber,
  })

  return isExist ? true : false
}

//password check method
UserSchema.statics.isPasswordMatched = async function (
  encrypted_pass: string,
  given_pass: string
): Promise<boolean> {
  return await bcrypt.compare(given_pass, encrypted_pass)
}

// Checking  phone number (Just for valid message)
UserSchema.pre('save', async function (next) {
  const isExist = await User.findOne({
    phoneNumber: this.phoneNumber,
  })

  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Already user created by this phone number'
    )
  } else {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds)
    )
    next()
  }
})

export const User = model<IUser, UserModel>('User', UserSchema)
