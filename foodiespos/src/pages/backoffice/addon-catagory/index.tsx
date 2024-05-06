import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import NewAddonCatagory from "@/src/components/NewAddonCatagory";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const AddonCatagory = () => {
    const [open, setOpen] = useState(false)
  return (
      <BackOfficeLayout>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{ bgcolor: "#627254", "&:hover": { bgcolor: "#78876a" } }}
              variant="contained" onClick={() => setOpen(true)}
            >
              New Addon Catagory
            </Button>
          </Box>
          <NewAddonCatagory setOpen={setOpen} open = {open}/>
        </Box>
      </BackOfficeLayout>
    
  );
};

export default AddonCatagory;
