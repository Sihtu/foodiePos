import BackOfficeLayout from "@/src/components/BackOfficeLayout";
import DeleteDialog from "@/src/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { openSnackBar } from "@/src/store/slice/AppSnackBarSlice";
import { updateMenuCatagory } from "@/src/store/slice/menuCatagorySlice";
import { deleteMenu, updateMenu } from "@/src/store/slice/menuSlice";
import { UpdateMenu } from "@/src/types/menu";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Menu, MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const menuDatiles = () => {
  const dispatch = useAppDispatch();
  const { item } = useAppSelector((item) => item.menu);
  const router = useRouter();
  const menuDatilesId = Number(router.query.id);
  const showMenu = item.find((item) => item.id === menuDatilesId);
  const [updateData, setUpdateData] = useState<UpdateMenu>();
  const { menuCategoryMenu } = useAppSelector((item) => item.menuCategoryMenu);
  const { menuCatagory } = useAppSelector((item) => item.menuCatagory);
  const [selected, setSelected] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { disableLocationMenu } = useAppSelector(
    (item) => item.disableLocationMenu
  );
  const { selectedLocation } = useAppSelector((item) => item.app);

  const handleDeleteMenu = () => {
    dispatch(
      deleteMenu({
        id: menuDatilesId,
        onSuccess: () =>
          dispatch(
            openSnackBar({ type: "success", message: "Menu hane been delete" })
          ),
      })
    );
    setOpen(false);
    router.push("/backoffice/menu");
  };

  const selectedMenuCategoryIds = menuCategoryMenu
    .filter((item) => item.menuId === menuDatilesId)
    .map((i) => {
      const menuCategory = menuCatagory.find(
        (item) => item.id === i.menuCategoryId
      ) as MenuCategory;
      return menuCategory.id;
    });

  useEffect(() => {
    if (showMenu) {
      setUpdateData(showMenu);
      setSelected(selectedMenuCategoryIds);
    }
  }, [showMenu]);

  useEffect(() => {
    if (updateData) {
      setUpdateData({
        ...updateData,
        locationId: selectedLocation?.id,
        menuCategoryIds: selected,
      });
    }
  }, [selected]);
  const isAvailabel = disableLocationMenu.find(
    (item) =>
      item.menuId === menuDatilesId && item.locationId === selectedLocation?.id
  )
    ? false
    : true;

  const handleUpdate = () => {
    
    {
      updateData &&
        dispatch(
          updateMenu({
            ...updateData,
            onSuccess: () => {
              dispatch(openSnackBar({ type: "success", message: "Okay" }));
            },
          })
        );

      router.push("/backoffice/menu");
    }
  };

  return (
    <Box>
      <BackOfficeLayout>
        <Box display="flex" justifyContent="flex-end">
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
            value={updateData?.name}
            onChange={(event) => {
              setUpdateData(
                updateData && { ...updateData, name: event.target.value }
              );
            }}
            sx={{ m: 1 }}
          />
          <TextField
            value={updateData?.price}
            onChange={(event) =>
              setUpdateData(
                updateData && {
                  ...updateData,
                  price: Number(event.target.value),
                }
              )
            }
            sx={{ m: 1 }}
          />
          <FormControl sx={{ m: 1 }}>
            <InputLabel>Menu Category</InputLabel>
            <Select
              value={selected}
              onChange={(event) => {
                const ticket = event.target.value as number[];
                setSelected(ticket);
              }}
              multiple
              renderValue={() => {
                return selected
                  .map(
                    (itemId) =>
                      menuCatagory.find(
                        (menuCategory) => menuCategory.id === itemId
                      ) as MenuCategory
                  )
                  .map((item) => item.name)
                  .join(", ");
              }}
            >
              {menuCatagory.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    <Checkbox checked={selected.includes(item.id)}></Checkbox>
                    <ListItemText>{item.name}</ListItemText>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={isAvailabel}
                onChange={(event, value) => {
                  setUpdateData(
                    updateData && { ...updateData, isAvailable: value }
                  );
                }}
              />
            }
            label="Available"
          />
          <Button
            onClick={() => handleUpdate()}
            variant="contained"
            sx={{ m: 2, mt: 4, width: "fit-content" }}
          >
            Update
          </Button>
        </Box>
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          handleDelete={() => {
            handleDeleteMenu();
          }}
          title="Delete Menu"
          content="Are you sure to delete menu?"
        />
      </BackOfficeLayout>
    </Box>
  );
};

export default menuDatiles;
