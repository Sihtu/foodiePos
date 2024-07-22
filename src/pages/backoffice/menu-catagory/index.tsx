import AppSnackBar from "@/src/components/AppSnackBar";
import ItemCard from "@/src/components/ItemCard";
import NewMenuCatagoryDialog from "@/src/components/NewMenuCatagoryDialog";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { hideSnackBar } from "@/src/store/slice/AppSnackBarSlice";
import { CreateMenuCatagory } from "@/src/types/menuCatagory";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";

const MenuCatagory = () => {
  const dispatch = useAppDispatch();
  const { company } = useAppSelector((item) => item.company);
  const { menuCatagory } = useAppSelector((item) => item.menuCatagory);
  const { type, message } = useAppSelector((store) => store.snackBar);
  const [open, setOpen] = useState(false);
  const { selectedLocation } = useAppSelector((item) => item.app);
  const { disableLocationMenuCategories } = useAppSelector(
    (item) => item.disableLocationMenuCategory
  );

  const [newMenuCatagory, setNewMenuCatagory] = useState<CreateMenuCatagory>({
    name: "",
    isAvailable: true,
    companyId: company?.id,
  });
  useEffect(() => {
    setTimeout(() => dispatch(hideSnackBar()), 3000), [message];
  });
  return (
    <Box>
      <Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
            >
              New Menu Catagory
            </Button>
          </Box>
          <Box sx={{ display: "flex" }}>
            {menuCatagory.map((menuCategoryItem) => {
              const isDisable =disableLocationMenuCategories&& disableLocationMenuCategories.find(
                (item) =>
                  item.menuCategoryId === menuCategoryItem.id &&
                  item.locationId === selectedLocation?.id
              )
                ? false
                : true;
              return (
                <ItemCard
                  key={menuCategoryItem.id}
                  icon={<CategoryIcon />}
                  title={menuCategoryItem.name}
                  href={`/backoffice/menu-catagory/${menuCategoryItem.id}`}
                  isAvaliable={isDisable}
                />
              );
            })}
          </Box>
          <NewMenuCatagoryDialog
            setOpen={setOpen}
            open={open}
            newMenuCatagory={newMenuCatagory}
            setNewMenuCatagory={setNewMenuCatagory}
          />
          <AppSnackBar />
        </Box>
      </Box>
    </Box>
  );
};

export default MenuCatagory;
