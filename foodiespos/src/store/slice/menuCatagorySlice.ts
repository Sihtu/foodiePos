import { config } from "@/src/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenuCategory } from "@prisma/client";
import { BaseOption } from "@/src/types/types";

interface CreateMenuCategory extends BaseOption{}

interface Init {
  menuCatagory: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: Init = {
  menuCatagory: [],
  isLoading: false,
  error: null,
};

export const CreateNewMenuCatagory = createAsyncThunk(
  "createMenuCatagory/menuCatagory",
  async (newMenuCatagory: CreateMenuCategory, thunkApi) => {
    const {onSuccess, ...payload} = newMenuCatagory
    const respond = await fetch(`${config.backOfficeUrl}/menu-catagory`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({...payload}),
    });
    const data = await respond.json();
    const { menuCatagory } = data;

    newMenuCatagory.onSuccess && newMenuCatagory.onSuccess();
    thunkApi.dispatch(addMenuCatagory(menuCatagory));
  }
);
const menuCatagory = createSlice({
  name: "menuCatagory",
  initialState,
  reducers: {
    setMenuCatagory: (state, action: PayloadAction<MenuCategory[]>) => {
      state.menuCatagory = action.payload;
    },
    addMenuCatagory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCatagory = [...state.menuCatagory, action.payload];
    },
    removeMenuCatagory: (state, action: PayloadAction<MenuCategory>) => {
      const menu = state.menuCatagory.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { setMenuCatagory, addMenuCatagory, removeMenuCatagory } =
  menuCatagory.actions;
export default menuCatagory.reducer;
