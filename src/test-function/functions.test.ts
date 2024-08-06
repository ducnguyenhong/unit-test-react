import { getTotalPrice, sum } from './functions';

it('Test function case 1: Sum', () => {
  expect(sum(1, 2)).toBe(3);
});

it('Test function case 2: Total price', () => {
  const orderList = [
    {
      product: 'Product 1',
      price: 10,
      quantity: 1
    },
    {
      product: 'Product 2',
      price: 20,
      quantity: 2
    }
  ];
  expect(getTotalPrice(orderList)).toBe(50);
});
