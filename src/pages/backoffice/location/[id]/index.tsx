import DeleteDialog from "@/src/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { openSnackBar } from "@/src/store/slice/AppSnackBarSlice";
import {
  deleteLocationFunction,
  updateLocationFunction,
} from "@/src/store/slice/LocationsSlice";
import { setSelectedLocation } from "@/src/store/slice/appSlice";
import { UpdateLocation } from "@/src/types/location";
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LocationDetails = () => {
  const { selectedLocation } = useAppSelector((item) => item.app);
  const { locations } = useAppSelector((item) => item.location);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locationDetailsId = Number(router.query.id);

  const [updateLocation, setUpdateLocation] = useState<UpdateLocation>();
  const showLocation = locations.find((item) => item.id === locationDetailsId);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (showLocation) {
      setUpdateLocation(showLocation);
    }
  }, [locations]);

  if (!showLocation) {
    return (
      <Box>
        <Typography variant="h4">Location not found</Typography>
      </Box>
    );
  }

  const handleUpdate = () => {
    const shouldUpdate = updateLocation?.name !== showLocation?.name;
    if (!shouldUpdate) {
      return router.push("/backoffice/location");
    }
    {
      updateLocation &&
        dispatch(
          updateLocationFunction({
            ...updateLocation,
            onSuccess: () =>
              dispatch(
                openSnackBar({
                  type: "success",
                  message: "Location was successfully changed.",
                })
              ),
          })
        );
    }
    setOpen(false);
    router.push("/backoffice/location");
  };

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
        <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
          <TextField
            value={updateLocation?.name}
            sx={{ width: 400, mb: 2 }}
            onChange={(event) =>
              setUpdateLocation(
                updateLocation && {
                  ...updateLocation,
                  name: event.target.value,
                }
              )
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={selectedLocation?.id === showLocation?.id}
                onChange={() => {
                  if (showLocation) {
                    localStorage.setItem(
                      "setLocationId",
                      String(showLocation.id)
                    );
                    dispatch(setSelectedLocation(showLocation));
                  }
                }}
                name="gilad"
              />
            }
            label="Current Location"
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content", mt: 5 }}
            onClick={() => handleUpdate()}
          >
            Update
          </Button>
        </Box>
      </Box>
      <Box>
        <DeleteDialog
          title={"Location"}
          content={"Are you sure to delete this location"}
          open={open}
          setOpen={setOpen}
          handleDelete={() => {
            dispatch(
              deleteLocationFunction({
                id: locationDetailsId,
                onSuccess: () =>
                  dispatch(
                    openSnackBar({
                      type: "success",
                      message: "Location was delete successfully.",
                    })
                  ),
              })
            );
            setOpen(false);
            router.push("/backoffice/location");
          }}
        />
      </Box>
    </Box>
  );
};

export default LocationDetails;
