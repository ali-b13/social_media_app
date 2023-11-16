"use client";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { getLikedPosts } from '@/app/actions/getPosts';
export const fetchLikedPosts = createAsyncThunk('posts/fetchLikedPosts', async (userId:string) => {
  console.log(userId,'id')
  const response = await getLikedPosts(userId)
  return response;
});
// Define a type for the slice state
interface PostsType{
    value:any[],
}

// Define the initial state using that type
const initialState:PostsType = {
  value: [],
}

export const likedPosts = createSlice({
  name: 'likedPosts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    updatePosts: (state, action:any) => {
        const post=action.payload
      return { ...state, value: [post, ...state.value] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLikedPosts.fulfilled, (state, action) => {
        console.log(action.payload,'payload')
      return {...state,value:action.payload.likedPosts}
    });
  },
})

export const { updatePosts } = likedPosts.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPposts = (state: RootState) => state.likedPosts

export default likedPosts.reducer