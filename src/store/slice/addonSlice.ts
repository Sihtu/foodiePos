import { config } from "@/src/config";
import { AddonProps, CreateAddon, UpdateAddon } from "@/src/types/addon";
import { AddonCategoryProps } from "@/src/types/addonCategory";
import { Addon, AddonCategory } from "@prisma/client";
import {
  PayloadAction,
  PayloadActionCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const initialState: AddonProps = {
  addons: [],
  isLoading: false,
  error: null,
};

export const createdAddon = createAsyncThunk(
  "addon/createdAddon",
  async (createdData: CreateAddon, thunkApi) => {
    const { onSuccess, onError } = createdData;
    const respond = await fetch(`${config.backOfficeUrl}/addon`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(createdData),
    });
    const { addon } = await respond.json();
    thunkApi.dispatch(addAddon(addon));
    onError && onError();
    onSuccess && onSuccess();
  }
);

export const updateAddon = createAsyncThunk(
  "addon/updateAddon",
  async (updateData: UpdateAddon, thunkApi) => {
    const { onSuccess } = updateData;
    const respond = await fetch(`${config.backOfficeUrl}/addon`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const { addon } = await respond.json();
    thunkApi.dispatch(replaceAddon(addon));
    onSuccess && onSuccess();
  }
);

const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddon: (state, action: PayloadAction<Addon[]>) => {
      state.addons = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = [...state.addons, action.payload];
    },
    replaceAddon: (state, action: PayloadAction<UpdateAddon>) => {
      state.addons = state.addons.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setAddon, addAddon, replaceAddon } = addonSlice.actions;
export default addonSlice.reducer;
