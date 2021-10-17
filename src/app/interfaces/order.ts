export interface Order {
  userId?: string,
  address?: string,
  date?: Date,
  orderDetail: {
    item_code: number,
    item_qty: number
  },
  paymentMethod: string,
  totalCash: number
}
