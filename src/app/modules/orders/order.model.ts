import { Schema, Types, model } from 'mongoose'
import { IOrder, OrderModel } from './order.interface'

//
const OrderSchema = new Schema<IOrder, OrderModel>({
  cow: { type: Schema.Types.ObjectId, required: true, ref: 'Cow' },
  buyer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
})

// all orders static method
OrderSchema.statics.allOrders = async function (): Promise<Partial<
  IOrder[]
> | null> {
  return await Order.find({}).populate('cow').populate('buyer')
}

// order details static method
OrderSchema.statics.orderDetails = async function (
  order_id: Types.ObjectId | string
): Promise<Partial<IOrder | null> | null> {
  return await Order.findOne({
    _id: new Types.ObjectId(order_id),
  })
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
          select: 'name phoneNumber address',
        },
      ],
    })
    .populate('buyer', { name: 1, phoneNumber: 1, address: 1, _id: 0 })
    .populate('buyer')
}

// buyer orders static method
OrderSchema.statics.buyerOrders = async function (
  buyer_id: Types.ObjectId | string
): Promise<Partial<IOrder[]> | null> {
  return await Order.find({ buyer: buyer_id }).populate('cow').populate('buyer')
}
// buyer order details
OrderSchema.statics.buyerOrderDetails = async function (
  buyer_id: Types.ObjectId | string,
  order_id: Types.ObjectId | string
): Promise<Partial<IOrder | null> | null> {
  return await Order.findOne({
    buyer: buyer_id,
    _id: new Types.ObjectId(order_id),
  })
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
          select: 'name phoneNumber address',
        },
      ],
    })
    .populate('buyer', { name: 1, phoneNumber: 1, address: 1, _id: 0 })
    .populate('buyer')
}

// seller orders static method
OrderSchema.statics.sellerOrders = async function (
  seller_id: Types.ObjectId | string
): Promise<Partial<IOrder[]> | null> {
  let all_orders = await Order.find({}).populate('cow').populate('buyer')
  if (all_orders && all_orders?.length > 0) {
    all_orders = all_orders.filter(
      (order: IOrder) =>
        'seller' in order.cow && order?.cow?.seller == seller_id
    )
  }
  return all_orders
}

//  seller order details static method
OrderSchema.statics.sellerOrderDetails = async function (
  seller_id: Types.ObjectId | string,
  order_id: Types.ObjectId | string
): Promise<Partial<IOrder | null> | null> {
  let order_details = await Order.findOne({
    _id: new Types.ObjectId(order_id),
  })
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
          select: 'name phoneNumber address',
        },
      ],
    })
    .populate('buyer', { name: 1, phoneNumber: 1, address: 1, _id: 0 })
    .populate('buyer')
  if (
    order_details &&
    'seller' in order_details.cow &&
    order_details?.cow?.seller?._id !== seller_id
  ) {
    order_details = null
  }
  return order_details
}

export const Order = model<IOrder, OrderModel>('Order', OrderSchema)
