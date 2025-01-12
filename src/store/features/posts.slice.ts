import { postState } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const initialState: postState = {
  posts: null,
  postDetails: null,
};

// Async thunk to get posts
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { getState }) => {
    const state = getState() as RootState; 
    const token = state.userReducer.token;

    const options = {
      url: `https://linked-posts.routemisr.com/posts?limit=50&page=43`,
      method: "GET",
      headers: {
        token,
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      return data.posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }
);

// Async thunk to get post details
export const getPostDetails = createAsyncThunk(
  "posts/getPostDetails",
  async (id: string, { getState }) => {
    const state = getState() as RootState; 
    const token = state.userReducer.token;

    const options = {
      url: `https://linked-posts.routemisr.com/posts/${id}`,
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);
    console.log(data);
    return data.post;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, () => {
      console.log("rejected");
    });
    builder.addCase(getPostDetails.fulfilled, (state, action) => {
      state.postDetails = action.payload;
      console.log("yay");
    });
    builder.addCase(getPostDetails.rejected, () => {
      console.log("rejected");
    });
  },
});

export const PostsReduser = postSlice.reducer;
