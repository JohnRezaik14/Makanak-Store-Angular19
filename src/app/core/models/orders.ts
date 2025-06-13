export interface Order {
  id: number;
  date: string;
  total: number;
  status: 'pending' | 'accepted' | 'rejected';
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}
