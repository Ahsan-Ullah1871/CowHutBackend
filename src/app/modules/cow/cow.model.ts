import { Schema, model } from 'mongoose'
import { CowModel, ICow } from './cow.interface'
import { locations } from '../../../constant/common'
import { cow_categories, cow_label } from './cow.constant'

// And a schema that knows about IUserMethods
const CowSchema = new Schema<ICow, CowModel>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true, enum: locations },
  breed: { type: String, required: true },
  weight: { type: Number, required: true },
  label: { type: String, required: false, enum: cow_label },
  category: { type: String, required: true, enum: cow_categories },
  seller: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
})

export const Cow = model<ICow, CowModel>('Cow', CowSchema)
