import { Model, Types } from 'mongoose'
import { ICow } from '../cow/cow.interface'
import { IUser } from '../user/user.interface'

export type IOrder = {
  cow: Types.ObjectId | ICow
  buyer: Types.ObjectId | IUser
}

export type OrderModel = {
  allOrders(): Promise<IOrder[] | null>
  orderDetails(order_id: Types.ObjectId | string): Promise<IOrder | null>
  buyerOrders(buyer_id: Types.ObjectId | string): Promise<IOrder[] | null>
  buyerOrderDetails(
    buyer_id: Types.ObjectId | string,
    order_id: Types.ObjectId | string
  ): Promise<IOrder | null>
  sellerOrders(seller_id: Types.ObjectId | string): Promise<IOrder[] | null>
  sellerOrderDetails(
    seller_id: Types.ObjectId | string,
    order_id: Types.ObjectId | string
  ): Promise<IOrder | null>
} & Model<IOrder>
