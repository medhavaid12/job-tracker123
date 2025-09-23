import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Thunk for checking auth on app load
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (args, thunk) => {
    try {
      // Destructure data from the response
      const { data } = await axiosInstance.get("auth/check-auth", {
        withCredentials: true,
      });

      // Validation check
      if (data.status === "failed" || !data.response) {
        return thunk.rejectWithValue("Login failed. Try again!");
      }

      return data.response;
    } catch (error) {
      return thunk.rejectWithValue(error.message);
    }
  }
);

// Thunk for checking auth on app load
export const SignupUser = createAsyncThunk(
  "auth/SignupUser",
  async (args, thunk) => {
    try {
      // Destructure data from the response
      const { data } = await axiosInstance.post(
        "auth/signup",
        { ...args, accessFrom: "webApp" },
        {
          withCredentials: true,
        }
      );

      // Validation check
      if (data.status === "failed" || !data.response) {
        return thunk.rejectWithValue("Signup failed. Try again!");
      }

      return data.response;
    } catch (error) {
      return thunk.rejectWithValue(error.message);
    }
  }
);

// Thunk for checking auth on app load
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (args, thunk) => {
    try {
      // Destructure data from the response
      const { data } = await axiosInstance.post(
        "auth/login",
        { ...args, accessFrom: "webApp" },
        {
          withCredentials: true,
        }
      );

      // Validation check
      if (data.status === "failed" || !data.response) {
        return thunk.rejectWithValue("Login failed. Try again!");
      }

      return data.response;
    } catch (error) {
      return thunk.rejectWithValue(error.message);
    }
  }
);

// Thunk for logout and clear cookies
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (args, thunk) => {
    try {
      const { data } = await axiosInstance.get("auth/logout", {
        withCredentials: true,
      });

      // Validation check
      if (data.status === "failed" || !data.response) {
        return thunk.rejectWithValue("Logout failed. Try again!");
      }

      return data.response;
    } catch (error) {
      return thunk.rejectWithValue(error.message);
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      // Fetch User
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = null; // Expected outcome
      })
      // Signup User
      .addCase(SignupUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SignupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(SignupUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Something went wrong!";
      })
      // Login User
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Something went wrong!";
      })
      // Logout User
      .addCase(logoutUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

// Exports
export const authReducer = authSlice.reducer;
export const authSelector = (state) => {
  return state.authReducer;
};
