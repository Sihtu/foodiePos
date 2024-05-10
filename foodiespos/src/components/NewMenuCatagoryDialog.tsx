import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { CreateMenuCatagory, MenuCatagory } from "../types/menuCatagory";
import { useAppDispatch } from "../store/hook";
import { CreateNewMenuCatagory } from "../store/slice/menuCatagorySlice";
import { openSnackBar } from "../store/slice/AppSnackBarSlice";
interface Props {
  open: boolean;
  setOpen: any;
  newMenuCatagory: CreateMenuCatagory;
  setNewMenuCatagory: Dispatch<SetStateAction<CreateMenuCatagory>>;
}
const NewMenuCatagoryDialog = ({
  open,
  setOpen,
  newMenuCatagory,
  setNewMenuCatagory,
}: Props) => {
  const dispatch = useAppDispatch();
  const handleCreate = () => {
    dispatch(
      CreateNewMenuCatagory({
        ...newMenuCatagory,
        onSuccess: () => {
          dispatch(
            openSnackBar({
              type: "success",
              message: "It was created successfully",
            })
          ),
            setOpen(false);
        },
      })
    );
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
          <Typography>Add New Menu Catagory</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="name"
              onChange={(event) =>
                setNewMenuCatagory({
                  ...newMenuCatagory,
                  name: event.target.value,
                })
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={newMenuCatagory.isAvailable}
                  onChange={(event, value) =>
                    setNewMenuCatagory({
                      ...newMenuCatagory,
                      isAvailable: value,
                    })
                  }
                />
              }
              label="Available"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#627254" }}>Cancle</Button>
          <Button
            sx={{ bgcolor: "#627254", "&:hover": { bgcolor: "#78876a" } }}
            variant="contained"
            onClick={() => handleCreate()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewMenuCatagoryDialog;
