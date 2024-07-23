import OrderCard from "@/src/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { refreshOrder } from "@/src/store/slice/orderSlice";
import { OrderItem } from "@/src/types/order";
import { formatOrders } from "@/src/utils/general";

import { Box } from "@mui/material";
import { Order } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ActiveOrder = () => {
  const dispatch = useAppDispatch();
  const { init } = useAppSelector((item) => item.app);
  const orders = useAppSelector((item) => item.order.order);
  const tables = useAppSelector((item) => item.table.tables);
  const { addons } = useAppSelector((item) => item.addon);
  const menus = useAppSelector((item) => item.menu.item);
  const router = useRouter();
  const orderSeq = String(router.query.id);
  
  const orderItems = formatOrders(orders, addons, menus, tables) ; 
let intervalId : number

  useEffect(() => {
    if (orderSeq) {
      intervalId = window.setInterval(handleRefreshOrder, 10000);
    }
    return () => {
      window.clearInterval(intervalId);
    };
  }, [orderSeq]);
  
  const handleRefreshOrder = () => {
    dispatch(refreshOrder({ orderSeq: orderSeq}));
  };
  if(!orderItems) return null 

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", margin: 3 }}>
      {orderItems &&
        orderItems.map((orderItem) => {
          return <OrderCard key={orderItem.itemId} orderItem={orderItem} />;
        })}
    </Box>
  );
};

export default ActiveOrder;
