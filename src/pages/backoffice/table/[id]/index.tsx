
import DeleteDialog from "@/src/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { openSnackBar } from "@/src/store/slice/AppSnackBarSlice";
import { deletedTable, updateTable } from "@/src/store/slice/tableSlice";
import { UpdateTable } from "@/src/types/table";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TableDetails = () => {
  const dispatch = useAppDispatch();
  const { tables } = useAppSelector((item) => item.table);
  const [updateData, setUpdateData] = useState<UpdateTable>();
  const router = useRouter();
  const tableDetailsId = Number(router.query.id);
  const showTable = tables.find((item) => item.id === tableDetailsId);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (showTable) {
      setUpdateData(showTable);
    }
  }, [tables]);

  if (!updateData) {
    return (
      <Box>
        <Typography>Table is not found!</Typography>
      </Box>
    );
  }

  const handleUpdate = () => {
    dispatch(
      updateTable({
        ...updateData,
        onSuccess: () =>
          dispatch(
            openSnackBar({
              type: "success",
              message: "Table was updated successfully",
            }),
            router.push("/backoffice/table")
          ),
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deletedTable({
        id: tableDetailsId,
        onSuccess: () =>
          dispatch(
            openSnackBar({
              type: "success",
              message: "Table was deleted successfully",
            }),
            router.push("/backoffice/table")
          ),
      })
    );
    setOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        <TextField
          placeholder="name"
          value={updateData.name}
          onChange={(event) =>
            setUpdateData(
              updateData && { ...updateData, name: event.target.value }
            )
          }
        />
        <Button
          variant="contained"
          sx={{ width: "fit-content", mt: 2 }}
          onClick={() => handleUpdate()}
        >
          Update
        </Button>
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          title={"Delete Table"}
          content={"Are you sure to delete this table!"}
          handleDelete={handleDelete}
        />
      </Box>
    </Box>
  );
};

export default TableDetails;
