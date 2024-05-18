import { config } from "@/src/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenu } from "./menuSlice";
import { setMenuCatagory } from "./menuCatagorySlice";

interface Int {
  init: boolean;
  isLoading: boolean;
  error: boolean;
}
const initialState: Int = {
  init: false,
  isLoading: false,
  error: false,
};

export const fetchAppData = createAsyncThunk(
  "appSlice/fetchAppData",
  async (_, thunkApi) => {
    const respond = await fetch(`${config.backOfficeUrl}/app`);
    const data = await respond.json();
    const { menu, menuCatagory } = data;
    thunkApi.dispatch(setMenu(menu));
    thunkApi.dispatch(setMenuCatagory(menuCatagory));
    thunkApi.dispatch(setInt(true))
  }
);
const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setInt: (state, action) => {
      state.init = action.payload;
    },
  },
});

export const {setInt} = appSlice.actions
export default appSlice.reducer;
