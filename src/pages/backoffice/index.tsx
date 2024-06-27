import { config } from "@/src/config";
import { useAppDispatch } from "@/src/store/hook";
import { fetchAppData } from "@/src/store/slice/appSlice";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const BackOffice = () => {
  const dispatch = useAppDispatch()
  const { data } = useSession();
  
  return (
    <Box>
      <Typography variant="h3">Back Office {data?.user?.email}</Typography>
    </Box>
  );
};

export default BackOffice;
