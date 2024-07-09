import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../store/hook";
import { fetchAppData } from "../store/slice/appSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import OrderAppHeader from "./OrderAppHeader";
import OrderAppFooter from "./OrderAppFooter";

interface Props {
  children: ReactNode;
}
const OrderAppLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const tableId = Number(router.query.tableId);
  useEffect(() => {
    dispatch(fetchAppData({ tableId: tableId }));
  }, [tableId]);

  if (!tableId) return null;

  return (
    <Box>
      <Box sx={{ minHeight: "10vh", height: "auto", pb: { xs: 10, md: 0 } }}>
        <OrderAppHeader />
      </Box>
      <Box sx={{display: "flex",flexDirection: "column",  alignItems: "center"}}>{children}</Box>
      <Box>
        <OrderAppFooter></OrderAppFooter>
      </Box>
    </Box>
  );
};

export default OrderAppLayout;
