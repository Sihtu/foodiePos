import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fetchAppData, setThemes } from "../store/slice/appSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import OrderAppHeader from "./OrderAppHeader";
import OrderAppFooter from "./OrderAppFooter";
import { Theme } from "../types/app";

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
  
  const {theme} = useAppSelector((item)=> item.app)
  const themeName = localStorage.getItem("theme") as Theme
  if(themeName){

      dispatch(setThemes(themeName))
  }

  return (
    <Box
      sx={{
        minHeight: "150vh",
        height: "100%",
        pb: { xs: 10, md: 0 },
      }}
    >
      <OrderAppHeader />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        {children}
      </Box >
      <Box sx={{mt: 10}}>
      <OrderAppFooter /></Box>
    </Box>
  );
};

export default OrderAppLayout;
