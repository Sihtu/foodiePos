import { MenuCategoryMenuSlice } from "@/src/types/menuCatagory";
import { MenuCategoryMenu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: MenuCategoryMenuSlice = {
  menuCategoryMenu: [],
  isLoading: false,
  error: null,
};
const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {
    setMenuCategoryMenu: (state, action: PayloadAction<MenuCategoryMenu[]>) => {
      state.menuCategoryMenu = action.payload;
    },
  },
});

export const { setMenuCategoryMenu } = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
