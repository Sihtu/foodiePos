import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AddonCategory, Menu } from "@prisma/client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { CreateAddonCategory } from "../types/addonCategory";
import {
  createAddonCategory,
  setAddonCategory,
} from "../store/slice/addonCategorySlice";
import { openSnackBar } from "../store/slice/AppSnackBarSlice";
import { useRouter } from "next/router";
import MultipleSelect from "./MultipleSelect";

interface Props {
  open: boolean;
  setOpen: any;
}
const NewAddonCatagory = ({ open, setOpen }: Props) => {
  const { item } = useAppSelector((item) => item.menu);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [newAddonCategory, setNewAddonCategory] = useState<CreateAddonCategory>(
    { name: "", menuIds: [], isRequired: true }
  );
  const [selected, setSelected] = useState<number[]>([]);
  
  useEffect(() => {
    setNewAddonCategory({ ...newAddonCategory, menuIds: selected });
  }, [selected]);

  
  const handleCreate = () => {
    newAddonCategory &&
      dispatch(
        createAddonCategory({
          ...newAddonCategory,
          onSuccess: () =>
            dispatch(
              openSnackBar({
                type: "success",
                message: "Addon Category was created successfully",
              }),
              router.push("/backoffice/addon-catagory"),
              setOpen(false)
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
          <Typography>New Addon Catagory</Typography>
        </DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              sx={{ width: 300, mb: 2 }}
              placeholder="Name"
              onChange={(event) =>
                setNewAddonCategory(
                  newAddonCategory && {
                    ...newAddonCategory,
                    name: event.target.value,
                  }
                )
              }
            />
            <Box>
              <MultipleSelect
                title={"Menu"}
                selected={selected}
                setSelected={setSelected}
                item={item}
              />

              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={newAddonCategory.isRequired}
                      onChange={(event, value) =>
                        setNewAddonCategory({
                          ...newAddonCategory,
                          isRequired: value,
                        })
                      }
                    />
                  }
                  label="Require"
                />
              </Box>
            </Box>
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

export default NewAddonCatagory;
