import DeleteDialog from "@/src/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { openSnackBar } from "@/src/store/slice/AppSnackBarSlice";
import {
  removeMenuCatagory,
  removeMenuCategoryFunction,
  updateMenuCatagory,
} from "@/src/store/slice/menuCatagorySlice";
import { UpdateMenuCatagoryPayload } from "@/src/types/menuCatagory";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type MenuCategoryType = MenuCategory | undefined;

const menuCatagoryDetails = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [updateData, setUpdateData] = useState<UpdateMenuCatagoryPayload>();
  const { menuCatagory } = useAppSelector((item) => item.menuCatagory);
  const { selectedLocation } = useAppSelector((item) => item.app);
  const { disableLocationMenuCategories } = useAppSelector(
    (item) => item.disableLocationMenuCategory
  );
  const router = useRouter();
  const menuCatagoryId = Number(router.query.id);
  const showMenuCatagory = menuCatagory.find(
    (item) => item.id === menuCatagoryId
  );

  const isAvailable =disableLocationMenuCategories&& disableLocationMenuCategories.find(
    (item) =>
      item.menuCategoryId === menuCatagoryId &&
      item.locationId === selectedLocation?.id
  )
    ? false
    : true;

  useEffect(() => {
    if (showMenuCatagory) {
      setUpdateData({
        ...showMenuCatagory,
        isAvailable,
        locationId: selectedLocation?.id,
      });
    }
  }, [menuCatagory]);
  const handleUpdate = () => {
    
    {
      updateData &&
        dispatch(
          updateMenuCatagory({
            ...updateData,
            onSuccess: () => {
              dispatch(
                openSnackBar({
                  type: "success",
                  message: "Menu Catagory was created successfully",
                })
              );
              router.push("/backoffice/menu-catagory");
            },
          })
        );
    }
  };

  if (!showMenuCatagory) {
    return (
      <Box>
        <Typography variant="h6">Menu Catagory is not found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", maxWidth: 400 }}>
          <TextField
            value={updateData?.name}
            onChange={(event) =>
              setUpdateData(
                updateData && { ...updateData, name: event.target.value }
              )
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={isAvailable}
                onChange={(event, value) =>
                  setUpdateData(
                    updateData && { ...updateData, isAvailable: value }
                  )
                }
              />
            }
            label="Available"
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content", mt: 5 }}
            onClick={() => handleUpdate()}
          >
            Update
          </Button>
        </Box>
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          title="Delete Menu Category"
          content="Are you sure to delete Menu Category"
          handleDelete={() => {
            dispatch(removeMenuCategoryFunction({ id: menuCatagoryId }));
            setOpen(false);
            router.push("/backoffice/menu-catagory");
          }}
        />
      </Box>
    </Box>
  );
};

export default menuCatagoryDetails;
