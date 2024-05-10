import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import { config } from "@/src/config";
import { useAppDispatch } from "@/src/store/hook";
import { setMenuCatagory } from "@/src/store/slice/menuCatagorySlice";
import { setMenu } from "@/src/store/slice/menuSlice";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const BackOffice = () => {
  const dispatch = useAppDispatch()
  const { data } = useSession();
  useEffect(() => {
    getMenu();
  }, []);
  const getMenu = async () => {
    const respond = await fetch(`${config.backOfficeUrl}/app`);
    const data = await respond.json()
    const {menu, menuCatagory} = data
    dispatch(setMenu(menu))
    dispatch(setMenuCatagory(menuCatagory))
  };
  return (
    <BackOfficeLayout>
      <Typography variant="h3">Back Office {data?.user?.email}</Typography>
    </BackOfficeLayout>
  );
};

export default BackOffice;
