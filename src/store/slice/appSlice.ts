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
import { UploadAssentProps } from "@/src/types/app";

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
  async (_, thunkApi) => {
    const respond = await fetch(`${config.backOfficeUrl}/app`);
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
      table
    } = data;
    thunkApi.dispatch(setIsLoading(true));
    thunkApi.dispatch(setMenu(menu));
    thunkApi.dispatch(setAddon(addon));
    thunkApi.dispatch(setAddonCategory(addonCatagory));
    thunkApi.dispatch(setMenuAddonCategory(menuAddonCatagory))
    thunkApi.dispatch(setMenuCatagory(menuCatagory));
    thunkApi.dispatch(setCompany(company));
    thunkApi.dispatch(setDisableLocationMenu(disableLocationMenu));
    thunkApi.dispatch(setMenuCategoryMenu(menuCatagoryMenu));
    thunkApi.dispatch(setLocation(location));
    thunkApi.dispatch(setTable(table))
    thunkApi.dispatch(
      setDisableLocationMenuCategory(disableLocationMenuCategoryMenu)
    );

    thunkApi.dispatch(setIsLoading(false));
    const getsetLocation = localStorage.getItem("setLocationId");
    if (getsetLocation) {
      const getLocation = location.find(
        (item: any) => item.id === Number(getsetLocation)
      ) as Location;
      thunkApi.dispatch(setSelectedLocation(getLocation));
    } else {
      thunkApi.dispatch(setSelectedLocation(location[0]));
    }

    thunkApi.dispatch(setInt(true));
  }
);

export const uploadAsset = createAsyncThunk("app/uploadAsset",async (data: UploadAssentProps) => {
  const {file, onSuccess} = data
  const formData = new FormData()
  formData.append("file", file)
  console.log(formData)
  const respond = await fetch(`${config.backOfficeUrl}/asset`,{
    method: "POST",
    body: formData
  });
  const {assetUrl} = await respond.json()
  onSuccess && onSuccess(assetUrl)
})
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