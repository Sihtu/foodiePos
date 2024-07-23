import { Addon, Menu, Order, ORDERSTATUS, Table } from "@prisma/client";
import { CartItem } from "./cart";
import { BaseOption } from "./menu";

export interface CreateOrder extends BaseOption {
  tableId: number;
  cartItems: CartItem[];
}

export interface OrderAddon {
  addonCategoryId: number;
  addons: Addon[];
}

export interface OrderItem {
  itemId: string;
  status: ORDERSTATUS;
  orderAddons: OrderAddon[];
  menu: Menu;
  table: Table;
}


export interface RefreshOrder extends BaseOption {
  orderSeq: string
}

export interface OrderStatusUpdated extends BaseOption {
  itemId: string
  status: ORDERSTATUS
}