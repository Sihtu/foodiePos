import { Addon, Menu, Order, ORDERSTATUS, Table } from "@prisma/client";
import { CartItem } from "../types/cart";
import { OrderAddon, OrderItem } from "../types/order";
import { current } from "@reduxjs/toolkit";
import { table } from "console";

export const getTotalPrice = (cartItem: CartItem[]) => {
  const totalPrice = cartItem.reduce(
    (accu, item) => {
      const totalAddonPrice = item.addon.reduce((addonPrice, addon) => {
        addonPrice += addon.price;
        return addonPrice;
      }, 0);
      accu += (item.menu.price + totalAddonPrice) * item.quantity;
      return accu;
    },

    0
  );
  return totalPrice;
};

export const formatOrders = (
  orders: Order[],
  addons: Addon[],
  menus: Menu[],
  tables: Table[]
): OrderItem[] => {
  const orderItemIds: string[] = [];
  orders.forEach((order) => {
    const orderItemId = order.itemId;
    const existItemId = orderItemIds.find(
      (orderItemId) => orderItemId === order.itemId
    );
    if (!existItemId) {
      orderItemIds.push(orderItemId);
    }
  });
  const itemCardItems: OrderItem[] = orderItemIds.map((orderItemId) => {
    const currentOrder = orders.filter((order) => order.itemId === orderItemId);
    const addonIds = currentOrder.map((item) => item.addonId);
    let orderAddon: OrderAddon[] = [];
    addonIds.forEach((addonId) => {
      const addon = addons.find((item) => item.id === addonId);
      if (!addon) return;
      const exist = orderAddon.find(
        (item) => item.addonCategoryId === addon.addonCategoryId
      );
      if (exist) {
        orderAddon = orderAddon.map((item) => {
          const sameParent = item.addonCategoryId === addon.addonCategoryId;
          if (sameParent) {
            return {
              addonCategoryId: addon.addonCategoryId,
              addons: [...item.addons, addon],
            };
          } else {
            return item;
          }
        });
      } else {
        orderAddon = [
          ...orderAddon,
          { addonCategoryId: addon.addonCategoryId, addons: [addon] },
        ];
      }
    });
    return {
      itemId: orderItemId,
      status: currentOrder[0].status,
      orderAddons: orderAddon,
      menu: menus.find((menu) => menu.id === currentOrder[0].menuId) as Menu,
      table: tables.find((item) => item.id === currentOrder[0].tableId) as Table,
      
    };
  });
  return(itemCardItems)
};
