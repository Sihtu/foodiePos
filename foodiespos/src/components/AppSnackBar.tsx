import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { hideSnackBar } from "../store/slice/AppSnackBarSlice";

const AppSnackBar = () => {
  const { type, open, message } = useAppSelector((item) => item.snackBar);
  const dispatch = useAppDispatch();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      onClose={() => {}}
    >
      <Alert
        onClose={() => dispatch(hideSnackBar())}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default AppSnackBar;
