import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";

interface Props {
  children: ReactNode;
}
const BackOfficeLayout = ({ children }: Props) => {
  const { data } = useSession();
  return (
    <Box sx={{ height: "100vh", bgcolor: "red" }}>
      <TopBar />
      <Box sx={{ display: "flex", bgcolor: "#DDDDDD", height: "90%" }}>
        {data && <SideBar />}

        <Box sx={{ padding: 2, width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default BackOfficeLayout;
