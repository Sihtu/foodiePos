import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./slice/menuSlice";
import AppSnackBarSlice from "./slice/AppSnackBarSlice";

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    snackBar: AppSnackBarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
