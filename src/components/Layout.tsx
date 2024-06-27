import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import BackOfficeLayout from "./BackOfficeLayout";
import OrderApp from "./OrderApp";
import SingIn from "../pages/auth/singIn";
import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { tableId } = router.query;
  console.log(tableId);
  const isBackoffice = router.pathname.includes("backoffice");
  const isOrder = tableId;
  const { data } = useSession();
  if (isBackoffice) {
    return <BackOfficeLayout>{children}</BackOfficeLayout>;
  }
  if (isOrder) {
    return <OrderApp>{children}</OrderApp>;
  }
  return (
    <Box>
      {data ? (
        <BackOfficeLayout>
          <Box>Landing Side</Box>
        </BackOfficeLayout>
      ) : (
        <SingIn />
      )}
    </Box>
  );
};

export default Layout;
