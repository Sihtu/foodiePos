import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./slice/menuSlice";
import AppSnackBarSlice from "./slice/AppSnackBarSlice";
import menuCatagorySlice from "./slice/menuCatagorySlice";
import appSlice from "./slice/appSlice";

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    menuCatagory: menuCatagorySlice,
    snackBar: AppSnackBarSlice,
    app: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
