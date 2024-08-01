// Sum
export const sum = (a: number, b: number): number => {
  return a + b;
};

// Total price
type Order = {
  product: string;
  quantity: number;
  price: number;
};

export const getTotalPrice = (orderList: Order[]): number => {
  return orderList.reduce((prev, curr) => {
    return prev + curr.quantity * curr.price;
  }, 0);
};
