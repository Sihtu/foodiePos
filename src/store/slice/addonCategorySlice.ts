import { config } from "@/src/config";
import {
  AddonCategoryProps,
  CreateAddonCategory,
  DeleteAddonCategory,
  UpdateAddonCategory,
} from "@/src/types/addonCategory";
import { prisma } from "@/src/utils/prisma";
import { AddonCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { json } from "stream/consumers";
import {
  addMenuAddonCategory,
  setMenuAddonCategory,
} from "./menuAddonCategorySlice";

const initialState: AddonCategoryProps = {
  addonCategories: [],
  isLoading: false,
  error: null,
};

export const createAddonCategory = createAsyncThunk(
  "addonCategory/createAddonCategory",
  async (newAddonCategory: CreateAddonCategory, thunkApi) => {
    const { onSuccess } = newAddonCategory;
    const respond = await fetch(`${config.backOfficeUrl}/addon-catagory`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newAddonCategory),
    });
    const { addonCategory, menuAddonCategory } = await respond.json();
    thunkApi.dispatch(addAddonCategory(addonCategory));
    thunkApi.dispatch(addMenuAddonCategory(menuAddonCategory));
    onSuccess && onSuccess();
  }
);

export const updateAddonCategory = createAsyncThunk(
  "addonCategory/updateAddonCategory",
  async (updateData: UpdateAddonCategory, thunkApi) => {
    const { onSuccess } = updateData;
    const respond = await fetch(`${config.backOfficeUrl}/addon-catagory`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const { addonCategory, menuAddonCategories } = await respond.json();

    console.log(addonCategory);
    thunkApi.dispatch(replaceAddonCategory(addonCategory));
    thunkApi.dispatch(setMenuAddonCategory(menuAddonCategories));
    onSuccess && onSuccess();
  }
);

export const deleteAddonCategory = createAsyncThunk(
  "addonCategory/deleteAddonCategory",
  async (deleteData: DeleteAddonCategory, thunkApi) => {
    const { onSuccess, id } = deleteData;
    await fetch(`${config.backOfficeUrl}/addon-catagory?id=${id}`, {
      method: "DELETE",
    });
    thunkApi.dispatch(removeAddonCategory(id));
    onSuccess && onSuccess();
  }
);

const addonCategorySlice = createSlice({
  name: "addonCategory",
  initialState,
  reducers: {
    setAddonCategory: (state, action: PayloadAction<AddonCategory[]>) => {
      state.addonCategories = action.payload;
    },
    addAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = [...state.addonCategories, action.payload];
    },
    replaceAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = state.addonCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAddonCategory: (state, action: PayloadAction<number>) => {
      state.addonCategories = state.addonCategories.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setAddonCategory,
  addAddonCategory,
  replaceAddonCategory,
  removeAddonCategory,
} = addonCategorySlice.actions;
export default addonCategorySlice.reducer;
