"use client";
import { configureStore } from '@reduxjs/toolkit'
import postSlice from './features/posts/postSlice';
// ...
import likedPostSlice from './features/posts/likedPostSlice';
export const store = configureStore({
  reducer: {
    posts:postSlice,
    likedPosts:likedPostSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch