import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./slice/menuSlice";
import AppSnackBarSlice from "./slice/AppSnackBarSlice";
import menuCatagorySlice from "./slice/menuCatagorySlice";
import appSlice from "./slice/appSlice";
import companySlice from "./slice/companySlice";
import menuCategoryMenuSlice from "./slice/menuCategoryMenuSlice";
import LocationsSlice from "./slice/LocationsSlice";
import disableLocationMenuCategory from "./slice/disableLocationMenuCategory";
import disableLocationMenus from "./slice/disableLocationMenu";
import addonCategorySlice from "./slice/addonCategorySlice";
import addonSlice from "./slice/addonSlice";
import menuAddonCategorySlice from "./slice/menuAddonCategorySlice";

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    menuCatagory: menuCatagorySlice,
    menuCategoryMenu: menuCategoryMenuSlice,
    snackBar: AppSnackBarSlice,
    company: companySlice,
    location: LocationsSlice,
    app: appSlice,
    disableLocationMenuCategory: disableLocationMenuCategory,
    disableLocationMenu: disableLocationMenus,
    addonCategory: addonCategorySlice,
    addon: addonSlice,
    menuAddonCategory: menuAddonCategorySlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
