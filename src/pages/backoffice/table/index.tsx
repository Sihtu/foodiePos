import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import NewTableDialog from "@/src/components/NewTableDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Table = () => {
    const [open,setOpen] = useState(false)
  return (
    
      <BackOfficeLayout>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{ bgcolor: "#627254", "&:hover": { bgcolor: "#78876a" } }}
              variant="contained" onClick={()=> setOpen(true)}
            >
              New Table
            </Button>
          </Box>
          <NewTableDialog setOpen= {setOpen} open= {open}/>
        </Box>
      </BackOfficeLayout>
    
  );
};

export default Table;
