import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import { user_role } from '../../../constant/common'
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'

// And a schema that knows about IUserMethods
const UserSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: user_role },
    password: { type: String, required: true },
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
    next()
  }
})

export const User = model<IUser, UserModel>('User', UserSchema)
