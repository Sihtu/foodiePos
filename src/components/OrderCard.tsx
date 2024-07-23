import {
  Box,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { OrderItem, OrderStatusUpdated } from "../types/order";
import { useAppSelector } from "../store/hook";
import { ORDERSTATUS } from "@prisma/client";
import { useState } from "react";

interface Props {
  orderItem: OrderItem;
  isAdmin?: boolean;
  handleOrderStatusUpdate?: (itemId: string, status: ORDERSTATUS) => void;
}
const OrderCard = ({ orderItem, isAdmin, handleOrderStatusUpdate }: Props) => {
  const { addonCategories } = useAppSelector((item) => item.addonCategory);
  const { addons } = useAppSelector((item) => item.addon);
  if (!orderItem) {
    return <Box>There is no order cards</Box>;
  }
  const orderAddons = orderItem.orderAddons;
  if (!orderAddons) {
    return null;
  }
  

  return (
    <Card sx={{ width: 235, height: 290, m: 3 }}>
      <Box>
        <Box
          sx={{
            marginLeft: 1,
            marginRight: 1,
            pl: 1,
            pr: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box key={orderItem.itemId}> {orderItem.menu.name}</Box>
          <Box>{orderItem.table.id}</Box>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", ml: 3, mr: 3 }}
      >
        ItemId: <Typography>{orderItem.itemId}</Typography>
      </Box>
      <Divider sx={{ ml: 2, mr: 2 }} />
      <Box sx={{ height: 180, overflow: "scroll" }}>
        {orderItem.orderAddons.length > 0 ? (
          <Box>
            {orderAddons.map((orderAddon) => {
              const addonCategory = addonCategories.find(
                (item) => item.id === orderAddon.addonCategoryId
              );
              const addon = addons.filter((item) =>
                orderAddon.addons.find((addon) => addon.id === item.id)
              );

              const showAddon = addon.filter(
                (item) => item.addonCategoryId === orderAddon.addonCategoryId
              );
              return (
                <Box key={orderAddon.addonCategoryId}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 3,
                    mr: 3,
                  }}
                >
                  <Typography>{addonCategory?.name}</Typography>{" "}
                  <Typography
                    sx={{
                      ml: 2,
                      mb: 2,
                      fontStyle: "italic",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {showAddon.map((item) => {
                      return <Typography key={item.id}>{item.name}</Typography>;
                    })}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box sx={{ height: "100%" }}>NO Addon</Box>
        )}
      </Box>

      {isAdmin ? (
        <Box>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={orderItem.status}
              label="status"
              onChange={(event) => {
                handleOrderStatusUpdate &&
                  handleOrderStatusUpdate(
                    orderItem.itemId,
                    event.target.value as ORDERSTATUS
                  );
              }}
            >
              <MenuItem value={ORDERSTATUS.PENDING}>
                {ORDERSTATUS.PENDING}
              </MenuItem>
              <MenuItem value={ORDERSTATUS.COOKING}>
                {ORDERSTATUS.COOKING}
              </MenuItem>
              <MenuItem value={ORDERSTATUS.COMPLETE}>
                {ORDERSTATUS.COMPLETE}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      ) : (
        <Box>
          {
            <Box
              sx={{
                fontWeight: "bole",
                fontSize: 15,
                display: "flex",
                justifyContent: "space-between",
                ml: 2,
                mr: 2,
                borderTop: "1px solid black",
                mt: 1,
                p: 1,
              }}
            >
              {" "}
              <Typography>status :</Typography>
              <Typography>{orderItem.status}</Typography>
            </Box>
          }
        </Box>
      )}
    </Card>
  );
};

export default OrderCard;
