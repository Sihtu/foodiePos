import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { createMenu } from "../store/slice/menuSlice";
import { hideSnackBar, openSnackBar } from "../store/slice/AppSnackBarSlice";
import AppSnackBar from "./AppSnackBar";
import { MenuCategory } from "@prisma/client";
import { NewMenuPram } from "../types/menu";

interface Props {
  open: boolean;
  setOpen: any;
}


const NewMenuDialog = ({ open, setOpen }: Props) => {
  const { menuCatagory } = useAppSelector((item) => item.menuCatagory);
  const { type, message } = useAppSelector((store) => store.snackBar);
  const dispatch = useAppDispatch();
  const [newMenu, setNewMenu] = useState<NewMenuPram>({ name: "", price: 0,menuCategorIds: [] });
  

  const handleClick = () => {
    //vaild 
    const isVild = newMenu.name && newMenu.menuCategorIds.length > 0
    if (!isVild) {
      console.log(newMenu)
      return }
    dispatch(
      createMenu({
        ...newMenu,
        onSuccess: () =>
          dispatch(
            openSnackBar({
              type: "success",
              message: "It was created successfully",
            })
          ),
      })
    );
    setOpen(false);
  };
  return (
    <Box>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <DialogTitle>
          <Typography>Add New Menu</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              placeholder="name"
              sx={{ padding: 1 }}
              onChange={(event) =>
                setNewMenu({ ...newMenu, name: event.target.value })
              }
            />
            <TextField
              placeholder="price"
              sx={{ padding: 1 }}
              onChange={(event) =>
                setNewMenu({ ...newMenu, price: Number(event.target.value) })
              }
            />
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>Menu Category</InputLabel>
              {/*Select onChange can output "array with number from MenuItem" */}
              <Select
                onChange={(event) => {
                  const ticket = event.target.value as number[];
                  setNewMenu({...newMenu, menuCategorIds: ticket});
                }}
                renderValue={() => {
                  {
                    /*Used Map before find because selected only have number. So, we want to change that number to name. so name only have menuCategory. And use find for menuCategory. When we use find we get array. After that we need to find name again from this array . So again we use map*/
                  }
                  const selectedMenuCategories = newMenu.menuCategorIds.map(
                    (selectedId) =>
                      menuCatagory.find(
                        (item) => item.id === selectedId
                      ) as MenuCategory
                  );
                  return selectedMenuCategories
                    .map((item) => item.name)
                    .join(", ");
                }}
                value={newMenu.menuCategorIds}
                multiple
                input={<OutlinedInput label="Menu Category" />}
              >
                {menuCatagory.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {/*It was check for "checking ticket box" */}
                      <Checkbox checked={newMenu.menuCategorIds.includes(item.id)} />
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#627254" }}>Cancle</Button>
          <Button
            sx={{ bgcolor: "#627254", "&:hover": { bgcolor: "#78876a" } }}
            variant="contained"
            onClick={() => handleClick()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewMenuDialog;
