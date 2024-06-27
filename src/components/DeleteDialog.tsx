import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  content: string;
  handleDelete: () => void;
}

const DeleteDialog = ({
  title,
  content,
  handleDelete,
  open,
  setOpen,
}: Props) => {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle sx={{display: "flex",alignItems: "center"}}>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button variant="outlined">Cancle</Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
