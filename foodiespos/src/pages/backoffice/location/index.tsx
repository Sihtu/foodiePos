import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import NewLocationDialog from "@/src/components/NewLocationDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Location = () => {
    const [open, setOpen] = useState(false)
  return (
    
      <BackOfficeLayout>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{ bgcolor: "#627254", "&:hover": { bgcolor: "#78876a" } }}
              variant="contained" onClick={() => setOpen(true)}
            >
              New Location
            </Button>
          </Box>
          <NewLocationDialog setOpen={setOpen} open = {open}/>
        </Box>
      </BackOfficeLayout>
  );
};

export default Location;
