//postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadItems = () => {
  const storedItems = localStorage.getItem("items");
  return storedItems ? JSON.parse(storedItems) : [];
};

// The slice
const itemSlice = createSlice({
  name: "items",
  initialState: loadItems(),
  //   initialState: {
  //     items:[]
  //   }

  reducers: {
    addItem: (state, action) => {
      //   state.items.push(action.payload);
      state.push(action.payload);
    },
    deleteItem: (state, action) => {
      //   state.items = state.items.filter((item) => item.id !== action.payload);
     return state.filter((item) => item.id !== action.payload);  // use return if state variable not defined explictly
    },
  },
});

export const { addItem, deleteItem } = itemSlice.actions;

export default itemSlice.reducer;
