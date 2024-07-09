import OrderAppHeader from "@/src/components/OrderAppHeader";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { CartItem } from "@/src/types/cart";
import { getTotalPrice } from "@/src/utils/general";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import { Addon } from "@prisma/client";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { removeFromCart } from "@/src/store/slice/cartSlice";
import { useRouter } from "next/router";

const cart = () => {
  const { item } = useAppSelector((item) => item.cart);
  const router = useRouter()
const dispatch = useAppDispatch()
  const renderAddon = (addon: Addon[]) => {
    if (!addon.length) return null;
    return addon.map((item) => {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "40%",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  mr: 1,
                  backgroundColor: "#1B9C85",
                }}
              >
                {item.quantity}
              </Avatar>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "40%",
              }}
            >
              <Box>{item.menu.name}</Box>
              <Box>{item.menu.price}</Box>
            </Box>

            {renderAddon(item.addon)}
            <Box sx={{display: "flex", justifyContent: "flexe"}}>
                <EditIcon onClick={()=> router.push({
                  pathname: `/order/menu/${item.menu.id}`,query: {...router.query, cartItemId: item.id}
                })}/>
                <DeleteIcon onClick={()=> dispatch(removeFromCart(item))}/>
            </Box>
          </Box>
        );
      })}
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 50, pt: 5 }}>
        <Typography>Total : {getTotalPrice(item)}</Typography>
      </Box>
    </Box>
  );
};

export default cart;
