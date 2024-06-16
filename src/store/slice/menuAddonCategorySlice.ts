import { AddonProps } from "@/src/types/addon";
import { AddonCategoryProps } from "@/src/types/addonCategory";
import { MenuAddonCategoryProps } from "@/src/types/menuAddonCategory";
import { Addon, AddonCategory, MenuAddonCategory } from "@prisma/client";
import { Payload } from "@prisma/client/runtime/library";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



const initialState : MenuAddonCategoryProps= {
  menuAddonCategory: [],
  isLoading: false,
  error: null,
};
const menuAddonCategorySlice = createSlice({
  name: "menuAddonCategory",
  initialState,
  reducers: {
    setMenuAddonCategory: (state, action: PayloadAction <MenuAddonCategory[]>)=> {
        state.menuAddonCategory = action.payload
    },
    addMenuAddonCategory: (state, action: PayloadAction<MenuAddonCategory>)=> {
      state.menuAddonCategory = [...state.menuAddonCategory, action.payload]
    }
  },
});

export const {setMenuAddonCategory,addMenuAddonCategory} = menuAddonCategorySlice.actions
export default menuAddonCategorySlice.reducer;
