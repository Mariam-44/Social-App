import { userState } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState: userState = {
  token: localStorage.getItem("token"),
};

// Login Thunk
export const login = createAsyncThunk(
  "user/login",
  async (values: { email: string; password: string }) => {
    const options = {
      url: `https://linked-posts.routemisr.com/users/signin`,
      method: "POST",
      data: values,
    };
    const { data } = await axios.request(options);
    return data;
  }
);

// Signup Thunk
export const signup = createAsyncThunk(
  "user/signup",
  async (values: { name: string; email: string; password: string }) => {
    const options = {
      url: `https://linked-posts.routemisr.com/users/signup`,
      method: "POST",
      data: values,
    };
    let { data } = await axios.request(options);
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.token = null; // Clear token in state
      localStorage.removeItem("token"); // Clear token in localStorage
      toast.success("Logged out successfully!");
    },
  },
  extraReducers: function (builder) {
    // Login Reducers
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      toast.success("Welcome Back");
    });
    builder.addCase(login.rejected, () => {
      toast.error("Incorrect email or password");
    });

    // Signup Reducers
    builder.addCase(signup.fulfilled, (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      toast.success("Account created successfully! Welcome aboard.");
    });
    builder.addCase(signup.rejected, () => {
      toast.error("Signup failed. Please try again.");
    });
  },
});

export const { logout } = userSlice.actions; // Export logout action
export const userReducer = userSlice.reducer;
