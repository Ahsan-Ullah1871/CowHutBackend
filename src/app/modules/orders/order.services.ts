import ApiError from '../../errors/ApiError'
import { Order } from './order.model'
import { User } from '../user/user.model'
import { IUser } from '../user/user.interface'
import httpStatus from 'http-status'
import { IOrder } from './order.interface'
import { ICow } from '../cow/cow.interface'
import { Cow } from '../cow/cow.model'
import mongoose from 'mongoose'

// Create new Order
const create_new_order = async (order_data: IOrder): Promise<IOrder | null> => {
  // buyer checking
  const BuyerDetails: IUser | null = await User.findById(order_data.buyer)
  if (!BuyerDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found')
  }

  // cow checking
  const CowDetails: ICow | null = await Cow.findById(order_data.cow)
  if (!CowDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow  not found')
  }

  if (CowDetails && CowDetails.label === 'sold out') {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow  already sold out')
  }

  // Buyer budget and cow price checking
  if (
    CowDetails &&
    BuyerDetails &&
    (BuyerDetails?.budget as number) < CowDetails?.price
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'You have not enough budget')
  }

  // Session Works
  let new_created_order
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    //
    const cow_label: Partial<ICow> = { label: 'sold out' }
    const updated_cow = await Cow.findByIdAndUpdate(
      order_data?.cow,
      cow_label,
      {
        session,
        new: true,
      }
    )

    //
    const buyer_budget: Partial<IUser> = {
      budget: (BuyerDetails?.budget as number) - CowDetails?.price,
    }
    const updated_buyer = await User.findByIdAndUpdate(
      order_data?.buyer,
      buyer_budget,
      {
        session,
        new: true,
      }
    )

    //
    const seller_data = await User.findById(CowDetails?.seller)
    const seller_income: Partial<IUser> = {
      income: (seller_data?.income as number) + CowDetails?.price,
    }

    const updated_seller = await User.findByIdAndUpdate(
      seller_data?._id,
      seller_income,
      {
        session,
        new: true,
      }
    )

    // order create
    const created_order = await Order.create([order_data], { session })

    if (
      !created_order?.length ||
      !updated_buyer ||
      !updated_cow ||
      !updated_seller
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create new order')
    }
    new_created_order = created_order[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()

    throw new ApiError(
      httpStatus.REQUEST_TIMEOUT,
      'Something is happening , try latter and  check the fields'
    )
  }

  return new_created_order
}

// get all orders
const gel_all_orders = async (): Promise<IOrder[] | null> => {
  const all_orders = await Order.find({}).populate('cow').populate('buyer')

  return all_orders
}

export const OrderServices = {
  create_new_order,
  gel_all_orders,
}
