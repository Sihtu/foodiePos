import {
  Box,
  Button,
  Checkbox,
  Chip,
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
import MultipleSelect from "./MultipleSelect";
import { uploadAsset } from "../store/slice/appSlice";
import FileDropZone from "./FileDropZone";

interface Props {
  open: boolean;
  setOpen: any;
}

const NewMenuDialog = ({ open, setOpen }: Props) => {
  const { menuCatagory } = useAppSelector((item) => item.menuCatagory);
  const { type, message } = useAppSelector((store) => store.snackBar);
  const [menuImage, setMenuImage] = useState<File>();
  const dispatch = useAppDispatch();
  const [newMenu, setNewMenu] = useState<NewMenuPram>({
    name: "",
    price: 0,
    menuCategorIds: [],
  });
  const [selected, setSelected] = useState<number[]>([]);
  useEffect(() => {
    setNewMenu({ ...newMenu, menuCategorIds: selected });
  }, [selected]);
  const handleCreate = () => {
    //vaild
    const isVild = newMenu.name && newMenu.menuCategorIds.length > 0;
    if (!isVild) {
      console.log(newMenu);
      return;
    }
    if (menuImage) {
      dispatch(
        uploadAsset({
          file: menuImage,
          onSuccess: (assetUrl) => {
            newMenu.assetUrl = assetUrl;
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
          },
        })
      );
    }

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
              sx={{ margin: 1 }}
              onChange={(event) =>
                setNewMenu({ ...newMenu, name: event.target.value })
              }
            />
            <TextField
              placeholder="price"
              sx={{ margin: 1 }}
              onChange={(event) =>
                setNewMenu({ ...newMenu, price: Number(event.target.value) })
              }
            />
            <MultipleSelect
              title={"Menu Category"}
              selected={selected}
              setSelected={setSelected}
              item={menuCatagory}
            />
            <Box>
              <FileDropZone onDrop={(file) => setMenuImage(file[0])} />
            </Box>
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

export default NewMenuDialog;
