import { config } from "@/src/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenu } from "./menuSlice";
import { setMenuCatagory } from "./menuCatagorySlice";
import { setCompany } from "./companySlice";
import { setMenuCategoryMenu } from "./menuCategoryMenuSlice";
import { setLocation } from "./LocationsSlice";
import { Payload } from "@prisma/client/runtime/library";
import { Location } from "@prisma/client";
import { setDisableLocationMenuCategory } from "./disableLocationMenuCategory";
import { setDisableLocationMenu } from "./disableLocationMenu";
import { setAddon } from "./addonSlice";
import { setAddonCategory } from "./addonCategorySlice";
import { setMenuAddonCategory } from "./menuAddonCategorySlice";
import { setTable } from "./tableSlice";
import { FetchAppDataProps, UploadAssentProps } from "@/src/types/app";
import { setOrder } from "./orderSlice";
import { selectClasses } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

interface Int {
  init: boolean;
  selectedLocation: Location | null;
  isLoading: boolean;
  error: boolean;
}
const initialState: Int = {
  init: false,
  selectedLocation: null,
  isLoading: false,
  error: false,
};

export const fetchAppData = createAsyncThunk(
  "appSlice/fetchAppData",
  async (option: FetchAppDataProps, thunkApi) => {
    const { tableId } = option;
    const apiUrl = tableId
      ? `${config.orderAppApiUrl}/app?tableId=${tableId}`
      : `${config.backOfficeUrl}/app`;
    const respond = await fetch(apiUrl);
    const data = await respond.json();
    const {
      menu,
      menuCatagory,
      company,
      menuCatagoryMenu,
      location,
      disableLocationMenuCategoryMenu,
      disableLocationMenu,
      addon,
      addonCatagory,
      menuAddonCatagory,
      table,
      order,
    } = data;
    thunkApi.dispatch(setIsLoading(true));
    thunkApi.dispatch(setMenu(menu));
    thunkApi.dispatch(setAddon(addon));
    thunkApi.dispatch(setAddonCategory(addonCatagory));
    thunkApi.dispatch(setMenuAddonCategory(menuAddonCatagory));
    thunkApi.dispatch(setMenuCatagory(menuCatagory));
    thunkApi.dispatch(setCompany(company));
    thunkApi.dispatch(setDisableLocationMenu(disableLocationMenu));
    thunkApi.dispatch(setMenuCategoryMenu(menuCatagoryMenu));
    thunkApi.dispatch(setLocation(location));
    thunkApi.dispatch(setTable(table));
    thunkApi.dispatch(
      setDisableLocationMenuCategory(disableLocationMenuCategoryMenu)
    );

    thunkApi.dispatch(setIsLoading(false));
    const getSetLocation = localStorage.getItem("setLocationId");

    if (getSetLocation) {
      const ownLocation =
        getSetLocation &&
        location.find((item: any) => item.id === Number(getSetLocation));
      if (!ownLocation) {
        localStorage.removeItem("setLocationId");
        localStorage.setItem("setLocationId", String(location[0]));
        thunkApi.dispatch(setSelectedLocation(location[0]))
        return
      }
      const getLocation = location.find(
        (item: any) => item.id === Number(getSetLocation)
      ) as Location;
      thunkApi.dispatch(setSelectedLocation(getLocation));
    } else {
      const locationId = location[0].id;
      localStorage.setItem("setLocationId", locationId);
      thunkApi.dispatch(setSelectedLocation(location[0]));
    }

    thunkApi.dispatch(setInt(true));
    thunkApi.dispatch(setOrder(order));
  }
);

export const uploadAsset = createAsyncThunk(
  "app/uploadAsset",
  async (data: UploadAssentProps) => {
    const { file, onSuccess } = data;
    const formData = new FormData();
    formData.append("file", file);
    const respond = await fetch(`${config.backOfficeUrl}/asset`, {
      method: "POST",
      body: formData,
    });
    const { assetUrl } = await respond.json();
    onSuccess && onSuccess(assetUrl);
  }
);
const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setInt: (state, action) => {
      state.init = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setInt, setSelectedLocation, setIsLoading } = appSlice.actions;
export default appSlice.reducer;
