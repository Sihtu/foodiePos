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
import SingleSelected from "./SingleSelect";
import { setSelectedLocation } from "../store/slice/appSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { useEffect, useState } from "react";
import { CreateAddon } from "../types/addon";
import { createdAddon } from "../store/slice/addonSlice";
import { openSnackBar } from "../store/slice/AppSnackBarSlice";
import { useRouter } from "next/router";

interface Props {
  open: boolean;
  setOpen: any;
}

const NewAddonDialog = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { addonCategories } = useAppSelector((item) => item.addonCategory);
  const [selected, setSelected] = useState<number>();
  const [newAddon, setNewAddon] = useState<CreateAddon>({
    name: "",
    price: 0,
    addonCategoryId: selected,
  });

  useEffect(() => {
    setNewAddon({ ...newAddon, addonCategoryId: selected });
  }, [selected]);

  const handleCreate = () => {
    const isVaild = newAddon.name && newAddon.addonCategoryId !== undefined;
    if (selected === undefined) {
      return dispatch(
        openSnackBar({
          type: "error",
          message: "Need to select one addon Category",
        })
      );
    }
    if (!isVaild) {
      return dispatch(
        openSnackBar({ type: "error", message: "Need to write name or price" })
      );
    }
    dispatch(
      createdAddon({
        ...newAddon,
        onSuccess: () =>
          dispatch(
            openSnackBar({
              type: "success",
              message: "New Addon was created successfully",
            }),
            setOpen(false),
            router.push("/backoffice/addon")
          ),
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
          <Typography>New Addon</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              placeholder="name"
              sx={{ m: 1 }}
              onChange={(event) =>
                setNewAddon({ ...newAddon, name: event.target.value })
              }
            />
            <TextField
              placeholder="price"
              sx={{ m: 1 }}
              onChange={(event) =>
                setNewAddon({ ...newAddon, price: Number(event.target.value) })
              }
            />
            <SingleSelected
              title={"Addon Category"}
              selected={selected}
              setSelected={setSelected}
              item={addonCategories}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button >Cancle</Button>
          <Button
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

export default NewAddonDialog;
