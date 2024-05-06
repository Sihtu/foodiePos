import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { createMenu } from "../store/slice/menuSlice";
import { hideSnackBar, openSnackBar } from "../store/slice/AppSnackBarSlice";
import AppSnackBar from "./AppSnackBar";

interface Props {
  open: boolean;
  setOpen: any;
}

interface GetMenu {
  name: string;
  price: number;
}
const NewMenuDialog = ({ open, setOpen }: Props) => {
  const {type, message}= useAppSelector(store => store.snackBar)
  const dispatch = useAppDispatch();
  const [newMenu, setNewMenu] = useState<GetMenu>({ name: "", price: 0 });
  useEffect(()=> {setTimeout(()=>{dispatch(hideSnackBar())},3000)}, [message])
  const handleClick = () => {
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
