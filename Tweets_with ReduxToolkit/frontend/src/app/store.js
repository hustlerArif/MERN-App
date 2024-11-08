//store.js
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";

export const store = configureStore({
  reducer: {
    item: postReducer,
  },
});
