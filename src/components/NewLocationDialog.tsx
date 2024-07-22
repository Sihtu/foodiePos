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
import { Location } from "@prisma/client";
import { CreateLocation } from "../types/location";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { createLocation } from "../store/slice/LocationsSlice";
import { openSnackBar } from "../store/slice/AppSnackBarSlice";

interface Props {
  open: boolean;
  setOpen: any;
}
const NewLocationDialog = ({ open, setOpen }: Props) => {
  const { company } = useAppSelector((item) => item.company);
  const dispatch = useAppDispatch();
  const [newLocation, setNewLocation] = useState<CreateLocation>({
    name: "",
    street: "",
    township: "",
    city: "",
    companyId: company?.id,
  });
  const handleCreate = () => {
    dispatch(
      createLocation({
        ...newLocation,
        onSuccess: () => {
          dispatch(
            openSnackBar({
              type: "success",
              message: "New location was created successfully.",
            })
          );
        },
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
          <Typography>New Location</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              placeholder="name"
              onChange={(event) =>
                setNewLocation({ ...newLocation, name: event.target.value })
              }
              sx={{ p: 1 }}
            />
            <TextField
              placeholder="city"
              onChange={(event) =>
                setNewLocation({ ...newLocation, city: event.target.value })
              }
              sx={{ p: 1 }}
            />
            <TextField
              placeholder="street"
              onChange={(event) =>
                setNewLocation({ ...newLocation, street: event.target.value })
              }
              sx={{ p: 1 }}
            />
            <TextField
              placeholder="township"
              onChange={(event) =>
                setNewLocation({ ...newLocation, township: event.target.value })
              }
              sx={{ p: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button>Cancle</Button>
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

export default NewLocationDialog;
