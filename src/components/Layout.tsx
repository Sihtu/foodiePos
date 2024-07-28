import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import BackOfficeLayout from "./BackOfficeLayout";
import SingIn from "../pages/auth/singIn";
import { signIn, signOut, useSession } from "next-auth/react";
import OrderAppLayout from "./OrderAppLayout";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { tableId } = router.query;
  const isBackoffice = router.pathname.includes("backoffice");
  const isOrder = tableId;
  if (isBackoffice) {
    return <BackOfficeLayout >{children}</BackOfficeLayout>;
  }
  if (isOrder) {
    return <OrderAppLayout>{children}</OrderAppLayout>;
  }else{
return (
    <Box>
      {children}
    </Box>
  );
  }
  
};

export default Layout;


