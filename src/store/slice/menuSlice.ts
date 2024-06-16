import { config } from "@/src/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Menu } from "@prisma/client";
import { DeleteMenuProps, NewMenuPram, UpdateMenu } from "@/src/types/menu";
import { setDisableLocationMenu } from "./disableLocationMenu";
import { setMenuCatagory } from "./menuCatagorySlice";
import { setMenuCategoryMenu } from "./menuCategoryMenuSlice";

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
    const { menu, newMenuCategoryMenu } = await respond.json();

    newMenu.onSuccess && newMenu.onSuccess();
    return menu;
  }
);

//For Update

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (payload: UpdateMenu, thunkApi) => {
    const { onSuccess } = payload;
    const respond = await fetch(`${config.backOfficeUrl}/menu`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const { disableLocationMenu, updateMenu, menuCategoryMenu } =
      await respond.json();
    thunkApi.dispatch(setDisableLocationMenu(disableLocationMenu));
    thunkApi.dispatch(replaceMenu(updateMenu));
    thunkApi.dispatch(setMenuCategoryMenu(menuCategoryMenu));
    onSuccess && onSuccess();
  }
);
//For Delete
export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (getMenu: DeleteMenuProps, thunkApi) => {
    const { id, onSuccess } = getMenu;
    await fetch(`${config.backOfficeUrl}/menu?id=${id}`, {
      method: "DELETE",
    });
    onSuccess && onSuccess();
    thunkApi.dispatch(removeMenu(id));
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
    removeMenu: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id !== action.payload);
    },
    replaceMenu: (state, action: PayloadAction<Menu>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
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
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isLoading = false;
        const err = new Error("createMenu is error occoured");
        state.error = err.message;
      });
  },
});

export const { setMenu, addMenu, removeMenu, replaceMenu } = MenuSlice.actions;
export default MenuSlice.reducer;
