import { Schema, model } from 'mongoose'
import { user_role } from '../../../constant/common'
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { AdminModel, IAdmin } from './admin.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

// And a schema that knows about IUserMethods
const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: user_role },
    password: { type: String, required: true, select: 0 },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

//isUserExist  static method
AdminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Partial<IAdmin> | null> {
  return await Admin.findOne(
    { phoneNumber },
    { _id: 1, role: 1, password: 1, phoneNumber: 1 }
  ).lean()
}

//password check method
AdminSchema.statics.isPasswordMatched = async function (
  encrypted_pass: string,
  given_pass: string
): Promise<boolean> {
  return await bcrypt.compare(given_pass, encrypted_pass)
}

// Checking  phone number (Just for valid message)
AdminSchema.pre('save', async function (next) {
  const isExist = await Admin.findOne({
    phoneNumber: this.phoneNumber,
  })

  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Already admin created by this phone number'
    )
  } else {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds)
    )
    next()
  }
})

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema)
