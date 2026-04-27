import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../redux/authReducer";
import { jobReducer } from "../redux/jobReducer";

export const store = configureStore({
  reducer: {
    authReducer,
    jobReducer,
  },
});
