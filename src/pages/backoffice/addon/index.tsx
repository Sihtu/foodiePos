import ItemCard from "@/src/components/ItemCard";
import NewAddonDialog from "@/src/components/NewAddonDialog";
import { useAppSelector } from "@/src/store/hook";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

import WaterDropIcon from "@mui/icons-material/WaterDrop";

const Addon = () => {
  const [open, setOpen] = useState(false);
  const { addons } = useAppSelector((item) => item.addon);
  return (
    <Box>
      <Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
            >
              New Addon
            </Button>
          </Box>
          <Box sx={{display: "flex" , flexWrap: "wrap"}}>
            {addons.map((item) => (
              <ItemCard key={item.id}
                title={item.name}
                icon={<WaterDropIcon />}
                href={`/backoffice/addon/${item.id}`}
              />
            ))}
          </Box>
          <NewAddonDialog setOpen={setOpen} open={open} />
        </Box>
      </Box>
    </Box>
  );
};

export default Addon;
