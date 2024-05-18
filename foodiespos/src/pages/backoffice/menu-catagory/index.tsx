import AppSnackBar from "@/src/components/AppSnackBar";
import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import ItemCard from "@/src/components/ItemCard";
import NewMenuCatagoryDialog from "@/src/components/NewMenuCatagoryDialog";
import { useAppDispatch, useAppSelector} from "@/src/store/hook";
import { hideSnackBar } from "@/src/store/slice/AppSnackBarSlice";
import { CreateMenuCatagory } from "@/src/types/menuCatagory";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";

const MenuCatagory = () => {
  const dispatch = useAppDispatch();
  const { menuCatagory } = useAppSelector((item) => item.menuCatagory);
  const { type, message } = useAppSelector((store) => store.snackBar);
  const [open, setOpen] = useState(false);
  const [newMenuCatagory, setNewMenuCatagory] = useState<CreateMenuCatagory>({
    name: "",
    isAvailable: true,
  });
  console.log(menuCatagory)
  useEffect(() => {
    setTimeout(() => dispatch(hideSnackBar()), 3000), [message];
  });
  return (
    <Box>
      <BackOfficeLayout>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{ bgcolor: "#627254", "&:hover": { bgcolor: "#78876a" } }}
              variant="contained"
              onClick={() => setOpen(true)}
            >
              New Menu Catagory
            </Button>
          </Box>
          <Box>
            {menuCatagory.map((item) => (
              <ItemCard
                key={item.id}
                icon={<CategoryIcon />}
                title={item.name}
                href={`/backoffice/menu-catagory/${item.id}`}
              />
            ))}
          </Box>
          <NewMenuCatagoryDialog
            setOpen={setOpen}
            open={open}
            newMenuCatagory={newMenuCatagory}
            setNewMenuCatagory={setNewMenuCatagory}
          />
          <AppSnackBar />
        </Box>
      </BackOfficeLayout>
    </Box>
  );
};

export default MenuCatagory;
