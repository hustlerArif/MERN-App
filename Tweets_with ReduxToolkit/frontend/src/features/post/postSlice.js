//postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for async actions

export const fetchItems = createAsyncThunk("/posts/getPosts", async () => {
  const response = await axios.get("https://mern-app-post-backend.onrender.com/posts/");
  return response.data;
});

export const addItem = createAsyncThunk(
  "posts/createPost",
  async ({ title, message, creator, tags }) => {
    const response = await axios.post("https://mern-app-post-backend.onrender.com/posts/", {
      title,
      message,
      creator,
      tags,
    });
    return response.data;
  }
);

export const deleteItem = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`https://mern-app-post-backend.onrender.com/posts/${id}`);
  return id;
});

export const updateItem = createAsyncThunk(
  "posts/updatePost",
  async ({ id, title, message, creator, tags }) => {
    const response = await axios.patch(`https://mern-app-post-backend.onrender.com/posts/${id}`, {
      title,
      message,
      creator,
      tags,
    });
    return response.data;
  }
);

export const updateCount = createAsyncThunk("posts/updateCount", async (id) => {
  const response = await axios.patch(
    `https://mern-app-post-backend.onrender.com/posts/${id}/likePost`,
    { id }
  );
  return response.data;
});

// The slice
const postSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    editingItem: null,
    status: "idle", // for handling loading states
    error: null,
  },
  reducers: {
    editItem(state, action) {
      state.editingItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.editingItem = null;
      })

      .addCase(updateCount.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      });
  },
});

export const { editItem } = postSlice.actions;

export default postSlice.reducer;
