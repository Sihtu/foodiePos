import SingleSelected from "@/src/components/SingleSelect";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { openSnackBar } from "@/src/store/slice/AppSnackBarSlice";
import { updateAddon } from "@/src/store/slice/addonSlice";
import { UpdateAddon } from "@/src/types/addon";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonDetails = () => {
  const dispatch = useAppDispatch();
  const { addons } = useAppSelector((item) => item.addon);
  const { addonCategories } = useAppSelector((item) => item.addonCategory);
  const router = useRouter();
  const addonDetailsId = Number(router.query.id);
  const showAddon = addons.find((item) => item.id === addonDetailsId);
  const [updateData, setUpdateData] = useState<UpdateAddon>();
  const [selected, setSelected] = useState<number>();
  useEffect(() => {
    if (showAddon) {
      setUpdateData(showAddon);
      setSelected(showAddon.addonCategoryId);
    }
  }, [showAddon]);

  useEffect(() => {
    if (updateData && selected) {
      setUpdateData({ ...updateData, addonCategoryId: selected });
    }
  }, [selected]);
  if (!updateData) {
    return (
      <Box>
        <Typography variant="h3">Addon is not found!</Typography>
      </Box>
    );
  }
  const handleUpdate = () => {
    if (updateData) {
      dispatch(
        updateAddon({
          ...updateData,
          onSuccess: () =>
            dispatch(
              openSnackBar({
                type: "success",
                message: "Addon was updated successfully",
              }),
              router.push("/backoffice/addon")
            ),
        })
      );
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" color="error">
          Delete
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        <TextField
          placeholder="name"
          value={updateData.name}
          onChange={(event) =>
            setUpdateData(
              updateData && { ...updateData, name: event.target.value }
            )
          }
          sx={{ p: 1 }}
        />
        <TextField
          placeholder="price"
          defaultValue={updateData.price}
          onChange={(event) =>
            setUpdateData(
              updateData && {
                ...updateData,
                price: Number(event.target.value),
              }
            )
          }
          sx={{ p: 1 }}
        />
        <SingleSelected selected={selected} setSelected={setSelected} item={addonCategories} title={"Addon Category"}/>
        
        <Button
          variant="contained"
          onClick={() => handleUpdate()}
          sx={{ width: "fit-content", p: 1, ml: 1 }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default AddonDetails;
