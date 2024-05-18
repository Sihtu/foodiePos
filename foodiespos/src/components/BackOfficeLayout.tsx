import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fetchAppData, setInt } from "../store/slice/appSlice";

interface Props {
  children: ReactNode;
}
const BackOfficeLayout = ({ children }: Props) => {
  const { init } = useAppSelector((item) => item.app);
  const dispatch = useAppDispatch();
  const { data } = useSession();
  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData());
    }
  }, []);

  return (
    <Box sx={{ height: "100vh"}}>
      <TopBar />
      <Box sx={{ display: "flex", bgcolor: "#DDDDDD", height: "90%" }}>
        {data && <SideBar />}

        <Box sx={{ padding: 2, width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default BackOfficeLayout;
