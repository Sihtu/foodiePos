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
  error: Error | null;
}

const initialState: Init = {
  item: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (newMenu: NewMenuPram) => {
   
    newMenu.onSuccess && newMenu.onSuccess()
    
    
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
});

export const { setMenu, addMenu, removeMenu } = MenuSlice.actions;
export default MenuSlice.reducer;
