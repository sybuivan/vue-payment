interface ICart {
  quantity: number;
  price: number;
}

export const calculateTotalPrice = (carts: ICart[]) => {
  return carts
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
};
