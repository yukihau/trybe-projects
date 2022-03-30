export interface Order {
  id: number,
  userId: number,
  product: number,
}

export interface OrderWithProducts {
  id: number,
  userId: number,
  products: number[],
}

export interface Service {
  code: number,
  data: OrderWithProducts[] | { message: string }
}
