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
import { CreateTable } from "../types/table";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { createdTable } from "../store/slice/tableSlice";
import { openSnackBar } from "../store/slice/AppSnackBarSlice";
import router from "next/router";

interface Props {
  open: boolean;
  setOpen: any;
}
const NewTableDialog = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedLocation } = useAppSelector((item) => item.app);
  
  const [newTable, setNewTable] = useState<CreateTable>({
    name: "",
    locationId: selectedLocation?.id,
    assetUrl: ""
  });

  const handleCreate = () => {
    dispatch(
      createdTable({
        ...newTable,
        onSuccess: () =>
          dispatch(
            openSnackBar({
              type: "success",
              message: "Table was created successfully",
            }),
            router.push("/backoffice/table")
          ),
      })
    );
    setOpen(false)
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
          <Typography>New Table</Typography>
        </DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              placeholder="name"
              onChange={(event) => {
                setNewTable({ ...newTable, name: event.target.value });
              }}
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

export default NewTableDialog;
