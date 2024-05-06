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

interface Props {
  open: boolean;
  setOpen: any;
}
const NewAddonCatagory = ({ open, setOpen }: Props) => {
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
          <Typography variant="h4">Add New Addon Catagory</Typography>
        </DialogContent>
        <DialogActions>
        <Button sx={{color: "#627254"}}>Cancle</Button>
          <Button sx={{bgcolor: "#627254", "&:hover": {bgcolor: "#78876a"}}} variant="contained" >Create</Button>
          
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewAddonCatagory;
