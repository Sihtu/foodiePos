import AppSnackBar from "@/src/components/AppSnackBar";
import ItemCard from "@/src/components/ItemCard";
import MenuCard from "@/src/components/MenuCard";
import NewMenuDialog from "@/src/components/NewMenuDialog";
import { useAppSelector } from "@/src/store/hook";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useState } from "react";

const Menu = () => {
  const menus = useAppSelector((item) => item.menu.item);
  const { disableLocationMenu } = useAppSelector(
    (item) => item.disableLocationMenu
  );
  const { selectedLocation } = useAppSelector((item) => item.app);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ bgcolor: "#627254", "&:hover": { bgcolor: "#78876a" } }}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add New Menu
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {disableLocationMenu &&
            menus.map((item) => {
              const isDisable = disableLocationMenu.find(
                (i) =>
                  i.menuId === item.id && i.locationId === selectedLocation?.id
              )
                ? false
                : true;
              return (
                <MenuCard
                menu={item}
                isAvailable = {isDisable}
                  key={item.id}
                  href={`/backoffice/menu/${item.id}`}
                />
              );
            })}
        </Box>
        <NewMenuDialog open={open} setOpen={setOpen} />
        <AppSnackBar />
      </Box>
    </Box>
  );
};

export default Menu;
