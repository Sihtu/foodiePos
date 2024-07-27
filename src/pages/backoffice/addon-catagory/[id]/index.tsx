import DeleteDialog from "@/src/components/DeleteDialog";
import MultipleSelect from "@/src/components/MultipleSelect";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { openSnackBar } from "@/src/store/slice/AppSnackBarSlice";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/src/store/slice/addonCategorySlice";
import { UpdateAddonCategory } from "@/src/types/addonCategory";
import { SellSharp } from "@mui/icons-material";
import {
  Checkbox,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonCatagoryDetails = () => {
  const menu = useAppSelector((item) => item.menu.item);
  const { menuAddonCategory } = useAppSelector(
    (item) => item.menuAddonCategory
  );
  const dispatch = useAppDispatch();
  const { addonCategories } = useAppSelector((item) => item.addonCategory);
  const router = useRouter();
  const addonCategoryDetailsId = Number(router.query.id);
  const showAddonCategory = addonCategories.find(
    (item) => item.id === addonCategoryDetailsId
  );
  const [open, setOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<UpdateAddonCategory>();
  const [selected, setSelected] = useState<number[]>([]);
  const selectedMenuIds = menuAddonCategory
    .filter((item) => item.addonCategoryId === addonCategoryDetailsId)
    .map((item) => item.menuId);

  useEffect(() => {
    if (showAddonCategory) {
      setUpdateData(showAddonCategory);
      setSelected(selectedMenuIds);
    }
  }, [showAddonCategory]);

  useEffect(() => {
    if (updateData) {
      setUpdateData({ ...updateData, menuId: selected });
    }
  }, [selected]);

  const handleUpdate = () => {
    updateData &&
      dispatch(
        updateAddonCategory({
          ...updateData,
          onSuccess: () =>
            dispatch(
              openSnackBar({
                type: "success",
                message: "Addon Category was updated successfully",
              }),
              router.push("/backoffice/addon-catagory")
            ),
        })
      );
  };

  const handleDelete = () => {
    dispatch(
      deleteAddonCategory({
        id: addonCategoryDetailsId,
        onSuccess: () =>
          dispatch(
            openSnackBar({
              type: "success",
              message: "Addon Category was deleted successfully",
            }),
            router.push("/backoffice/addon-catagory")
          ),
      })
    );
    setOpen(false);
  };

  if (!updateData) {
    return <Box>Backoffice can not show!</Box>;
  }
  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: 400 }}>
          <TextField
            sx={{ mb: 3 }}
            placeholder="Addon Category"
            defaultValue={showAddonCategory?.name}
            onChange={(event) =>
              setUpdateData(
                updateData && { ...updateData, name: event.target.value }
              )
            }
          />
          <MultipleSelect
            selected={selected}
            setSelected={setSelected}
            title={"Menu"}
            item={menu}
          />

          <FormControlLabel
            control={<Checkbox defaultChecked={updateData?.isRequired} />}
            onChange={(event, value) =>
              setUpdateData(updateData && { ...updateData, isRequired: value })
            }
            label="isRequired"
          />

          <Button
            sx={{ width: "fit-content", mt: 5 }}
            variant="contained"
            onClick={() => handleUpdate()}
          >
            Update
          </Button>
        </Box>
        <DeleteDialog
          title={"Addon Category"}
          content={"Are you sure to delete this addon category"}
          open={open}
          setOpen={setOpen}
          handleDelete={handleDelete}
        />
      </Box>
    </Box>
  );
};

export default AddonCatagoryDetails;
