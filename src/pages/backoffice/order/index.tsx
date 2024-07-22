import OrderCard from "@/src/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { orderStatusUpdated } from "@/src/store/slice/orderSlice";
import { OrderItem } from "@/src/types/order";
import { formatOrders } from "@/src/utils/general";
import { Box, Typography } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import { useState } from "react";

const Order = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((item) => item.order.order);
  const { addons } = useAppSelector((item) => item.addon);
  const menus = useAppSelector((item) => item.menu.item);
  const { tables } = useAppSelector((item) => item.table);
  const orderItems = formatOrders(orders, addons, menus, tables);
  const handleOrderStatusUpdate = (itemId: string, status: ORDERSTATUS) => {
    dispatch(orderStatusUpdated({itemId, status}))
  };
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", margin: 3 }}>
      {orderItems &&
        orderItems.map((orderItem) => {
          return (
            <OrderCard key={orderItem.itemId} orderItem={orderItem} isAdmin  handleOrderStatusUpdate={handleOrderStatusUpdate}/>
          );
        })}
    </Box>
  );
};

export default Order;
