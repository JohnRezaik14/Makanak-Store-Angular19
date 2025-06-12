export interface CartProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  count: number;
  isInCart?: boolean;
}
