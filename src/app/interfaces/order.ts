export interface Order {
  userId?: string;
  address?: any;
  date?: any;
  orderDetail?: { item_code?: number; item_qty?: number }[];
  paymentMethod?: string;
  totalCash?: number;
  status?: any;
  note?: string;
}
