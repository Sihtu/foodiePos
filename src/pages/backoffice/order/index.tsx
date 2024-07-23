import OrderCard from "@/src/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { orderStatusUpdated, setOrder } from "@/src/store/slice/orderSlice";
import { OrderItem } from "@/src/types/order";
import { formatOrders } from "@/src/utils/general";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import { Or } from "@prisma/client/runtime/library";
import { useState } from "react";

const Order = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((item) => item.order.order);
  const { addons } = useAppSelector((item) => item.addon);
  const menus = useAppSelector((item) => item.menu.item);
  const { tables } = useAppSelector((item) => item.table);

  const [orderState, setOrderState] = useState<ORDERSTATUS>();
  const orderItems = formatOrders(orders, addons, menus, tables).filter(
    (item) => item.status === orderState
  );
  const handleOrderStatusUpdate = (itemId: string, status: ORDERSTATUS) => {
    dispatch(orderStatusUpdated({ itemId, status }));
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5 }}>
        <ToggleButtonGroup
          color="primary"
          value={orderState}
          exclusive
          onChange={(event, value) => {
            setOrderState(value);
          }}
          aria-label="Platform"
        >
          <ToggleButton value={ORDERSTATUS.PENDING}>
            {ORDERSTATUS.PENDING}
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COOKING}>
            {ORDERSTATUS.COOKING}
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COMPLETE}>
            {ORDERSTATUS.COMPLETE}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", margin: 3 }}>
        {orderItems &&
          orderItems.map((orderItem) => {
            return (
              <OrderCard
                key={orderItem.itemId}
                orderItem={orderItem}
                isAdmin
                handleOrderStatusUpdate={handleOrderStatusUpdate}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default Order;
