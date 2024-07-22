
import ItemCard from "@/src/components/ItemCard";
import NewLocationDialog from "@/src/components/NewLocationDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppSelector } from "@/src/store/hook";
import { title } from "process";
import AppSnackBar from "@/src/components/AppSnackBar";

const Location = () => {
  const { locations } = useAppSelector((item) => item.location);
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
          >
            New Location
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {locations.map((item) => (
            <ItemCard
              title={item.name}
              href={`/backoffice/location/${item.id}`}
              icon={<LocationOnIcon />}
            />
          ))}
        </Box>
        <NewLocationDialog setOpen={setOpen} open={open} />
      </Box>
    </Box>
  );
};

export default Location;
