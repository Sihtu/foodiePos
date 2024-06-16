import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import ItemCard from "@/src/components/ItemCard";
import NewAddonCatagory from "@/src/components/NewAddonCatagory";
import { useAppSelector } from "@/src/store/hook";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

import PostAddIcon from "@mui/icons-material/PostAdd";

const AddonCatagory = () => {
  const [open, setOpen] = useState(false);
  const { addonCategories } = useAppSelector((item) => item.addonCategory);
  return (
    <BackOfficeLayout>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ bgcolor: "#627254", "&:hover": { bgcolor: "#78876a" } }}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            New Addon Catagory
          </Button>
        </Box>
        <Box sx={{ display: "flex" ,flexWrap: "wrap"}}>
          {addonCategories.map((item) => {
            return (
              <ItemCard
                key={item.id}
                icon={<PostAddIcon />}
                title={item.name}
                href={`/backoffice/addon-catagory/${item.id} `}
              />
            );
          })}
        </Box>
        <NewAddonCatagory setOpen={setOpen} open={open} />
      </Box>
    </BackOfficeLayout>
  );
};

export default AddonCatagory;
