import ApiError from '../../errors/ApiError'
import { Order } from './order.model'
import { User } from '../user/user.model'
import { IUser } from '../user/user.interface'
import httpStatus from 'http-status'
import { IOrder } from './order.interface'
import { ICow } from '../cow/cow.interface'
import { Cow } from '../cow/cow.model'
import mongoose, { Types } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'

// Create new Order
const create_new_order = async (order_data: IOrder): Promise<IOrder | null> => {
  // buyer checking
  const BuyerDetails: IUser | null = await User.isUserExistByID(
    order_data.buyer as Types.ObjectId
  )
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
      budget: Number((BuyerDetails?.budget as number) - CowDetails?.price),
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

    throw error
  }

  return new_created_order
}

// get all orders
const gel_all_orders = async (
  logged_in_user_data: JwtPayload
): Promise<IOrder[] | null> => {
  const { _id, role } = logged_in_user_data

  // return all orders base on role

  switch (role) {
    case 'admin':
      return await Order.allOrders()
    case 'buyer':
      return Order.buyerOrders(_id)
    case 'seller':
      return await Order.sellerOrders(_id)
    default:
      return null
  }
}

// get get_order_details
const get_order_details = async (
  logged_in_user_data: JwtPayload,
  order_id: string | Types.ObjectId
): Promise<IOrder | null> => {
  const { role, _id: user_id } = logged_in_user_data

  let order_details = null

  // return all orders base on role
  switch (role) {
    case 'admin':
      order_details = await Order.orderDetails(order_id)
      break
    case 'buyer':
      order_details = await Order.buyerOrderDetails(user_id, order_id)
      break
    case 'seller':
      order_details = await Order.sellerOrderDetails(user_id, order_id)
      break
    default:
      order_details = null
      break
  }

  if (!order_details || order_details === null) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  }

  return order_details
}

export const OrderServices = {
  create_new_order,
  gel_all_orders,
  get_order_details,
}
