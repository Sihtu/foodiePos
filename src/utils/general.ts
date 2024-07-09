import { CartItem } from "../types/cart";

export const getTotalPrice = (cartItem: CartItem[]) => {
  const totalPrice = cartItem.reduce(
    (accu, item) => {
      const totalAddonPrice = item.addon.reduce((addonPrice, addon) => {
        addonPrice += addon.price
        return addonPrice
      }, 0);
      accu = (item.menu.price + totalAddonPrice) * item.quantity
      return accu;
    },

    0
  );
  console.log(totalPrice)
  return totalPrice;
};
