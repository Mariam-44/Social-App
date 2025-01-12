import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user.slice";
import { PostsReduser } from "./features/posts.slice";

export const store = configureStore({
    reducer:{
        userReducer,
        PostsReduser
    }
})

type AppStore = typeof store

export type RootState = ReturnType<AppStore["getState"]>

export type AppDispatch = AppStore["dispatch"]