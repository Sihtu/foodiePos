import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useAppSelector } from "../store/hook";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Router } from "express";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";

const OrderAppHeader = () => {
  const { item } = useAppSelector((item) => item.cart);
  const { company } = useAppSelector((item) => item.company);
  const router = useRouter();

  const cart = router.pathname.includes("cart");

  return (
    <Box
      sx={{ position: "relative", display: "flex", justifyContent: "center" }}
    >
      <Box sx={{ position: "absolute", textAlign: "center", mt: 4 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: 19 }}>
          {company?.name}
        </Typography>
        <Typography sx={{ opacity: 0.7 }}>
          {company?.street} <br />
          {company?.township},{company?.township}
        </Typography>
      </Box>
      <Box sx={{ position: "absolute", right: 50, top: 25 }}>
        {cart ? (
          <HomeIcon
            onClick={() =>
              router.push({
                pathname: "/order",
                query: { tableId: router.query.tableId },
              })
            }
          />
        ) : (
          <Box>
            <ShoppingCartCheckoutIcon
              onClick={() =>
                router.push({ pathname: "/order/cart", query: router.query })
              }
            />{" "}
            <Box sx={{ position: "absolute", top: -10, right: -10 }}>
              {item.length}
            </Box>
          </Box>
        )}
      </Box>
      <Image
        src="/order_app_header.svg"
        alt="order image header"
        sizes="100vw"
        width={0}
        height={0}
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
};

export default OrderAppHeader;
