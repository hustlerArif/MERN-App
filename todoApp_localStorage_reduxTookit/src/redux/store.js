//store.js
import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../features/item/itemSlice";

// Middleware to sync Redux state with localStorage
const localStorageMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState();
  localStorage.setItem("items", JSON.stringify(state.item));
  return result;
};

export const store = configureStore({
  reducer: {
    item: itemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
