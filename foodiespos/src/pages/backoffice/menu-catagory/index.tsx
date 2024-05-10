import AppSnackBar from "@/src/components/AppSnackBar";
import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import NewMenuCatagoryDialog from "@/src/components/NewMenuCatagoryDialog";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { hideSnackBar } from "@/src/store/slice/AppSnackBarSlice";
import { CreateMenuCatagory } from "@/src/types/menuCatagory";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

const MenuCatagory = () => {
  const dispatch = useAppDispatch()
  const {type, message} = useAppSelector((store) => store.snackBar)
  const [open, setOpen] = useState(false);
  const [newMenuCatagory, setNewMenuCatagory] = useState<CreateMenuCatagory>({
    name: "",
    isAvailable: true,
  });
  useEffect(()=>{setTimeout(()=> dispatch(hideSnackBar()), 3000), [message]})
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
          <NewMenuCatagoryDialog
            setOpen={setOpen}
            open={open}
            newMenuCatagory={newMenuCatagory}
            setNewMenuCatagory={setNewMenuCatagory}
          />
          <AppSnackBar/>
        </Box>
      </BackOfficeLayout>
    </Box>
  );
};

export default MenuCatagory;
