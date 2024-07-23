import OrderAppHeader from "@/src/components/OrderAppHeader";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { CartItem } from "@/src/types/cart";
import { getTotalPrice } from "@/src/utils/general";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { Addon, Order } from "@prisma/client";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { removeFromCart } from "@/src/store/slice/cartSlice";
import { useRouter } from "next/router";
import OrderAppLayout from "@/src/components/OrderAppLayout";
import { createOrder } from "@/src/store/slice/orderSlice";
import { CreateOrder } from "@/src/types/order";

const Cart = () => {
  const { item } = useAppSelector((item) => item.cart);
  const router = useRouter();
  const tableId = Number(router.query.tableId);
  const dispatch = useAppDispatch();
  const vaild = item;

  if (item.length === 0) {
    return <Box>Your cart is empty now!</Box>;
  }

  const handleCreateOrder = () => {
    dispatch(
      createOrder({
        tableId,
        cartItems: item,
        onSuccess: (orders: Order[]) => {
          router.push({
            pathname: `/order/active-order/${orders[0].orderSeq}`,
            query: { tableId },
          });
        },
      })
    );
  };

  const renderAddon = (addon: Addon[]) => {
    if (!addon.length) return null;
    return addon.map((item) => {
      return (
        <Box key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mb: 2,
          }}
        >
          <Box>{item.name}</Box>
          <Box>{item.price}</Box>
        </Box>
      );
    });
  };
  return (
    <Box>
      {item.map((item) => {
        return (
          <Box key={item.id}
            sx={{
              width: 500,
            }}
          >
            <Box sx={{ display: "flex", width: "100%", mb: 2 }}>
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  mr: 1,
                }}
              >
                {item.quantity}
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography>{item.menu.name} </Typography>
                <Typography>{item.menu.price}</Typography>
              </Box>
            </Box>
            <Box sx={{ marginLeft: 4.5, mb: 2 }}>{renderAddon(item.addon)}</Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box>
                <EditIcon
                  onClick={() =>
                    router.push({
                      pathname: `/order/menu/${item.menu.id}`,
                      query: { ...router.query, cartItemId: item.id },
                    })
                  }
                />
                <DeleteIcon onClick={() => dispatch(removeFromCart(item))} />
              </Box>
            </Box>
          </Box>
        );
      })}
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Typography>Total : {getTotalPrice(item)}</Typography>
      </Box>
      <Box>
        <Button variant="contained" onClick={() => handleCreateOrder()}>
          CONFIRM ORDER
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
