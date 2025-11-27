import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/userSlice.js";
import postReducer from "../store/postSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;
