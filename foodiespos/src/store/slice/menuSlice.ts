import { config } from "@/src/config";
import { NewMenuPram } from "@/src/types/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Menu {
  id: number;
  name: string;
  price: number;
}
interface Init {
  item: Menu[];
  isLoading: boolean;
  error: string | null;
}

const initialState: Init = {
  item: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (newMenu: NewMenuPram) => {
    const { onSuccess, ...payload } = newMenu;
    const respond = await fetch(`${config.backOfficeUrl}/menu`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });
    const menu = await respond.json();
    console.log(menu)
    console.log("This is menu",menu)

    newMenu.onSuccess && newMenu.onSuccess();
    return menu;
  }
);

const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<Menu[]>) => {
      state.item = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.item = [...state.item, action.payload];
    },
    removeMenu: (state, action: PayloadAction<Menu>) => {
      state.item = state.item.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.item = [...state.item, action.payload];
        state.isLoading = false;
      }).addCase(createMenu.rejected, (state, action) =>{
        state.isLoading = false
        const err = new Error("createMenu is error occoured")
        state.error = err.message
      })
  },
});

export const { setMenu, addMenu, removeMenu } = MenuSlice.actions;
export default MenuSlice.reducer;
