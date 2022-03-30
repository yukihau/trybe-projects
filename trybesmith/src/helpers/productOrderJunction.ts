import { Order, OrderWithProducts } from '../interfaces/orders';

const productOrderJunction = (orders: Order[]) => {
  const newOrders: OrderWithProducts[] = orders
    .reduce((prev: OrderWithProducts[], curr: Order) => {
      const orderIsInArray = prev.find((order) => order.id === curr.id);

      if (!orderIsInArray) {
        const products: number[] = orders.filter((order) => order.id === curr.id)
          .map((order) => order.product);
        prev.push({ id: curr.id, userId: curr.userId, products });
      }

      return prev;
    }, []);

  return newOrders;
};

export default productOrderJunction;
