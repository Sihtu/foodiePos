import { useAppSelector } from "@/src/store/hook";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

const menuDatiles = () => {
  const { item } = useAppSelector((item) => item.menu);
  const router = useRouter();
  const menuDatilesId = Number(router.query.id);
  const showMenu = item.find((item) => item.id === menuDatilesId);

  return (
    <Box>
      <Typography>{showMenu?.id}</Typography>
      <h2>Menu id page</h2>
    </Box>
  );
};

export default menuDatiles;
