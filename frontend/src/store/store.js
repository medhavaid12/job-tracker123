import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../redux/authReducer";

export const store = configureStore({
  reducer: {
    authReducer,
  },
});
