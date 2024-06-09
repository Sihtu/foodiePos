import { DisableLocationMenuCategorySlice } from "@/src/types/menuCatagory";
import { DisabledLocationMenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DisableLocationMenuCategorySlice = {
  disableLocationMenuCategories: [],
  isLoading: false,
  error: null,
};

const disableLocationMenuCategory = createSlice({
  name: "disableLocationMenuCategory",
  initialState,
  reducers: {
    setDisableLocationMenuCategory: (
      state,
      action: PayloadAction<DisabledLocationMenuCategory[]>
    ) => {
      state.disableLocationMenuCategories = action.payload;
    },
  },
});

export const {setDisableLocationMenuCategory} = disableLocationMenuCategory.actions
export default disableLocationMenuCategory.reducer
