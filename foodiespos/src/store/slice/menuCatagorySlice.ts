import { config } from "@/src/config";
import { CreateMenuCatagory, MenuCatagory } from "@/src/types/menuCatagory";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Init {
  menuCatagory: MenuCatagory[];
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
    setMenuCatagory: (state, action: PayloadAction<MenuCatagory[]>) => {
      state.menuCatagory = action.payload;
    },
    addMenuCatagory: (state, action: PayloadAction<MenuCatagory>) => {
      state.menuCatagory = [...state.menuCatagory, action.payload];
    },
    removeMenuCatagory: (state, action: PayloadAction<MenuCatagory>) => {
      const menu = state.menuCatagory.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { setMenuCatagory, addMenuCatagory, removeMenuCatagory } =
  menuCatagory.actions;
export default menuCatagory.reducer;
