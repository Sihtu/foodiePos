import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { setThemes } from "@/src/store/slice/appSlice";
import { openSnackBar } from "@/src/store/slice/AppSnackBarSlice";
import { updatedCompany } from "@/src/store/slice/companySlice";
import { UpdateCompany } from "@/src/types/company";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SettingDetails = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((item) => item.app);
  const [updateData, setUpdateData] = useState<UpdateCompany>();
  const { company } = useAppSelector((item) => item.company);
  const router = useRouter();
  const SettingDetailsId = Number(router.query.id);
  const showCompany = company?.id === SettingDetailsId;

  useEffect(() => {
    if (showCompany) {
      setUpdateData(company);
    }
  }, [company]);

  const handleUpdate = () => {
    if (updateData) {
      dispatch(
        updatedCompany({
          ...updateData,
          onSuccess: () =>
            dispatch(
              openSnackBar({
                type: "success",
                message: "Table was updated successfully",
              }),
              router.push("/backoffice/setting")
            ),
        })
      );
    }
  };

  if (!company) {
    return (
      <Box>
        <Box>Table is not found</Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={theme === "dark"}
              onChange={(event, value) => {
                console.log(value)
                const theme = value? "dark" : "light"
                console.log(theme)
                dispatch(setThemes(theme))
                localStorage.setItem("theme", theme)
              }}
            />
          }
          label={"Dark Moode"}
        />
      </Box>
      <Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
          <TextField
            placeholder="company name"
            defaultValue={company.name}
            sx={{ mb: 1 }}
            onChange={(event) =>
              setUpdateData(
                updateData && { ...updateData, name: event.target.value }
              )
            }
          />
          <TextField
            placeholder="street"
            defaultValue={company.street}
            sx={{ mb: 1 }}
            onChange={(event) =>
              setUpdateData(
                updateData && { ...updateData, street: event.target.value }
              )
            }
          />
          <TextField
            placeholder="township"
            defaultValue={company.township}
            sx={{ mb: 1 }}
            onChange={(event) =>
              setUpdateData(
                updateData && { ...updateData, township: event.target.value }
              )
            }
          />
          <TextField
            placeholder="city"
            defaultValue={company.city}
            sx={{ mb: 1 }}
            onChange={(event) =>
              setUpdateData(
                updateData && { ...updateData, city: event.target.value }
              )
            }
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingDetails;
