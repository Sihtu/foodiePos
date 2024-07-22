import { Box, Snackbar } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fetchAppData, setInt } from "../store/slice/appSlice";
import AppSnackBar from "./AppSnackBar";
import { hideSnackBar } from "../store/slice/AppSnackBarSlice";

interface Props {
  children: ReactNode;
}
const BackOfficeLayout = ({ children }: Props) => {
  const {message} = useAppSelector((item) => item.snackBar)
  const { init } = useAppSelector((item) => item.app);
  const dispatch = useAppDispatch();
  const { data } = useSession();

  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData({}));
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackBar());
    }, 3000);
  }, [message]);

  return (
    <Box sx={{ height: "100vh", }}>
      <TopBar />
      <Box sx={{ display: "flex", height: "90%" }}>
        {data && <SideBar />}

        <Box sx={{ padding: 1, width: "100%", bgcolor: "info.main", }}>{children}</Box>
      </Box>
      <AppSnackBar/>
    </Box>
  );
};

export default BackOfficeLayout;
