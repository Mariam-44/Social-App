import { userState } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

// Safe access to localStorage for SSR
const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

const initialState: userState = {
  token: getToken(),
};

// Login Thunk
export const login = createAsyncThunk(
  "user/login",
  async (values: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const options = {
        url: `https://linked-posts.routemisr.com/users/signin`,
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Login failed.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Signup Thunk
export const signup = createAsyncThunk(
  "user/signup",
  async (values: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const options = {
        url: `https://linked-posts.routemisr.com/users/signup`,
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Signup failed.";
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.token = null; // Clear token in state
      if (typeof window !== "undefined") {
        localStorage.removeItem("token"); // Clear token in localStorage
      }
      toast.success("Logged out successfully!");
    },
  },
  extraReducers: (builder) => {
    // Login Reducers
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
      toast.success("Welcome Back!");
    });
    builder.addCase(login.rejected, (_, action) => {
      toast.error(action.payload as string || "Incorrect email or password.");
    });

    // Signup Reducers
    builder.addCase(signup.fulfilled, (state, action) => {
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
      toast.success("Account created successfully! Welcome aboard.");
    });
    builder.addCase(signup.rejected, (_, action) => {
      toast.error(action.payload as string || "Signup failed. Please try again.");
    });
  },
});

export const { logout } = userSlice.actions; // Export logout action
export const userReducer = userSlice.reducer;
