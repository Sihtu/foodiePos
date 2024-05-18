import AppSnackBar from "@/src/components/AppSnackBar";
import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import ItemCard from "@/src/components/ItemCard";
import NewMenuDialog from "@/src/components/NewMenuDialog";
import { useAppSelector } from "@/src/store/hook";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useState } from "react";

const Menu = () => {
  const { item } = useAppSelector((item) => item.menu);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <BackOfficeLayout>
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
        <Box>
          {item.map((item) => (
            <ItemCard
              icon={<RestaurantIcon />}
              title={item.name}
              href={`/backoffice/menu/${item.id}`}
            />
          ))}
        </Box>
        <NewMenuDialog open={open} setOpen={setOpen} />
        <AppSnackBar />
      </Box>
    </BackOfficeLayout>
  );
};

export default Menu;
