import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import NewMenuCatagoryDialog from "@/src/components/NewMenuCatagoryDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const MenuCatagory = () => {
    const [open, setOpen] = useState(false)
  return (
    <Box>
      <BackOfficeLayout>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{ bgcolor: "#627254", "&:hover": { bgcolor: "#78876a" } }}
              variant="contained"
              onClick={()=>setOpen(true)}
            >
              New Menu Catagory
            </Button>
          </Box>
          <NewMenuCatagoryDialog setOpen= {setOpen} open= {open} />
        </Box>
      </BackOfficeLayout>
    </Box>
  );
};

export default MenuCatagory;
