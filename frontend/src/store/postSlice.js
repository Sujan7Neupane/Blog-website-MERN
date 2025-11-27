import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: null,
    loading: false,
    error: null,
    options: ["Active", "Inactive"],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updatePostInState: (state, action) => {
      state.posts = state.posts.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );
      if (state.post && state.post._id === action.payload._id) {
        state.post = action.payload;
      }
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setPosts,
  setPost,
  addPost,
  updatePostInState,
  removePost,
  setError,
  clearError,
} = postSlice.actions;

export default postSlice.reducer;
