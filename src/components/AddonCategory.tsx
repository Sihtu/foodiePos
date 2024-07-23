import { Box, Chip, Typography } from "@mui/material";
import { Addon, AddonCategory } from "@prisma/client";
import ShowAddon from "./Addon";
import { setSelectedLocation } from "../store/slice/appSlice";

interface Props {
  addonCategory: AddonCategory[];
  selectedAddon: Addon[]
  setSelectedAddon: any
}
const ShowAddonCategory = ({ addonCategory, selectedAddon, setSelectedAddon }: Props) => {
  return (
    <Box sx={{display: "flex", justifyContent: "center",alignItems: "center", flexDirection: "column"}}>
      {addonCategory.map((item) => {
        return (
          <Box sx={{mt: 5}} key={item.id}>
            <Box sx={{display: "flex", justifyContent: "space-between",width: "100%"}}>
            <Typography>{item.name}</Typography>
            <Chip label={item.isRequired ? "Required" : "Optional"} />
            </Box>
            
            <Box>
              <ShowAddon addonCategoryId={item.id} selectedAddon={selectedAddon} setSelectedAddon={setSelectedAddon}/>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ShowAddonCategory;
