import { Box, Checkbox, FormControlLabel, Radio } from "@mui/material";
import { useAppSelector } from "../store/hook";
import { CheckBox } from "@mui/icons-material";
import { Addon } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props {
  addonCategoryId: number;
  selectedAddon: Addon[];
  setSelectedAddon: any;
}
const ShowAddon = ({
  addonCategoryId,
  selectedAddon,
  setSelectedAddon,
}: Props) => {
  const addonCategory = useAppSelector(
    (item) => item.addonCategory.addonCategories
  ).find((item) => item.id === addonCategoryId);
  const { addons } = useAppSelector((item) => item.addon);
  const addon = addons.filter(
    (item) => item.addonCategoryId === addonCategoryId
  );
  if (!addonCategory) return null;

  return (
    <Box>
      {addon.map((addon) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: 500,
            }}
          >
            <FormControlLabel
              control={
                addonCategory?.isRequired ? (
                  <Radio
                    checked={
                      selectedAddon.find((item) => item.id === addon.id)
                        ? true
                        : false
                    }
                    onChange={() => {
                      const addonIds = addons.map(item=> item.id)
                      const other = selectedAddon.filter((item)=> !addonIds.includes(item.id))
                      setSelectedAddon([...other, addon])
                    }}
                    
                  />
                ) : (
                  <Checkbox  checked={
                    selectedAddon.find((item) => item.id === addon.id)
                      ? true
                      : false
                  } onChange={(event , value)=> {
                    if(value){
                      setSelectedAddon([...selectedAddon, addon])
                    }else{
                      const selected = selectedAddon.filter((item)=> item.id !== addon.id)
                      setSelectedAddon(selected)
                    }
                  }}
                  />
                )
              }
              label={addon.name}
            />
            <Box sx={{mt: 1.3, paddingLeft: 8}}>{addon.price}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ShowAddon;
