import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import { useAppSelector } from "@/src/store/hook";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

const menuCatagoryDetails = () => {
    const {menuCatagory} = useAppSelector((item) => item.menuCatagory)
  const router = useRouter();
  const menuCatagoryId = Number(router.query.id)
  const showMenuCatagory = menuCatagory.find((item) => item.id === menuCatagoryId)
  
  return (
    <Box>
      <BackOfficeLayout>
        <Typography variant="h2">
            {showMenuCatagory?.name}
        </Typography>
      </BackOfficeLayout>
    </Box>
  );
};

export default menuCatagoryDetails;
