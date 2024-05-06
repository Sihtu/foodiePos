import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const BackOffice = () => {
  const {data } = useSession()
  return (
    <BackOfficeLayout>
      <Typography variant="h3">Back Office {data?.user?.email}</Typography>
    </BackOfficeLayout>
  );
};

export default BackOffice;
