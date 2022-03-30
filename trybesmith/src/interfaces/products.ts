export interface Product {
  name: string,
  amount: string,
}

export interface ProductWithId extends Product { 
  id: number,
}

export interface ProductWithOrderId extends ProductWithId { 
  orderId: number | void,
}

export interface ProductAsItem {
  item: ProductWithId,
}

export interface Service {
  code: number,
  data: ProductAsItem | ProductWithId[] | { message: string },
}
