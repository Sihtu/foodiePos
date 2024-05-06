
import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import NewAddonDialog from "@/src/components/NewAddonDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Addon = () => {
    const [open,setOpen] = useState(false)
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
              New Addon
            </Button>
          </Box>
          <NewAddonDialog setOpen={setOpen} open = {open}/>
        </Box>
      </BackOfficeLayout>
    </Box>
  );
};

export default Addon;
