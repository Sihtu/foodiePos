import AppSnackBar from "@/src/components/AppSnackBar";
import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import NewMenuDialog from "@/src/components/NewMenuDialog";

import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useState } from "react";

const Menu = () => {
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
        <NewMenuDialog open={open} setOpen={setOpen} />
        <AppSnackBar/>
      </Box>
    </BackOfficeLayout>
  );
};

export default Menu;
