import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import exp from "constants";

export type SnackBarType = "success" | "error";

interface Inter {
  type: SnackBarType;
  open: boolean;
  message: string;
}

const initialState: Inter = {
  type: "success",
  open: false,
  message: "",
};
const AppSnackBarSlice = createSlice({
  name: "AppSnackBar",
  initialState,
  reducers: {
    openSnackBar: (
      state,
      action: PayloadAction<{ type: SnackBarType; message: string }>
    ) => {
      state.open = true;
      const { type, message } = action.payload;
      state.type = type;
      state.message = message;
      
    },
    hideSnackBar: (state) => {
      state.open = false;
      state.message= "";
      state.type= "success"
    },
  },
});

export const  {openSnackBar, hideSnackBar} = AppSnackBarSlice.actions
export default AppSnackBarSlice.reducer;
