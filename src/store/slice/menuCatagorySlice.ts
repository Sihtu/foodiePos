import { config } from "@/src/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenuCategory } from "@prisma/client";
import {
  CreateMenuCatagory,
  RemoveMenuCategorySlice,
  UpdateMenuCatagoryPayload,
} from "@/src/types/menuCatagory";
import { setDisableLocationMenuCategory } from "./disableLocationMenuCategory";

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
  async (newMenuCatagory: CreateMenuCatagory, thunkApi) => {
    const { onSuccess, ...payload } = newMenuCatagory;
    const respond = await fetch(`${config.backOfficeUrl}/menu-catagory`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });
    const data = await respond.json();
    const { menuCatagory } = data;

    newMenuCatagory.onSuccess && newMenuCatagory.onSuccess();
    console.log("this is menu category form database", menuCatagory)
    thunkApi.dispatch(addMenuCatagory(menuCatagory));
  }
);

export const updateMenuCatagory = createAsyncThunk(
  "menuCatagory/updateMenuCatagory",
  async (updateMenuCatagoryPayload: UpdateMenuCatagoryPayload, thunkApi) => {
    const { onSuccess, ...payload } = updateMenuCatagoryPayload;
    const respond = await fetch(`${config.backOfficeUrl}/menu-catagory`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });

    const data = await respond.json();
    onSuccess && onSuccess();
    const { updatedMenuCatagory, disableMenuCategory } = data;
    thunkApi.dispatch(replaceMenuCatagory(updatedMenuCatagory));
    thunkApi.dispatch(setDisableLocationMenuCategory(disableMenuCategory))
    
      
    
  }
);

export const removeMenuCategoryFunction = createAsyncThunk(
  "menuCategory/removeMenuCategory",
  async (removeMenuCategory: RemoveMenuCategorySlice, thunkApi) => {
    const { id, onSuccess } = removeMenuCategory;
    await fetch(`${config.backOfficeUrl}/menu-catagory?id=${id}`, {
      method: "DELETE",
    });
    onSuccess && onSuccess();
    thunkApi.dispatch(removeMenuCatagory(id));
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
    removeMenuCatagory: (state, action: PayloadAction<number>) => {
      state.menuCatagory = state.menuCatagory.filter((item) =>
        item.id === action.payload ? false : true
      );
    },

    //it was important to repalce valuable
    replaceMenuCatagory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCatagory = state.menuCatagory.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const {
  setMenuCatagory,
  addMenuCatagory,
  removeMenuCatagory,
  replaceMenuCatagory,
} = menuCatagory.actions;
export default menuCatagory.reducer;
