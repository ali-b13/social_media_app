"use client";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { getPosts } from '@/app/actions/getPosts';
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (userId:string) => {
  console.log(userId,'id')
  // const response = await getPosts(userId)
  // return response;
});
// Define a type for the slice state
interface PostsType{
    value:any[],
}

// Define the initial state using that type
const initialState:PostsType = {
  value: [],
}

export const postSlice = createSlice({
  name: 'posts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    updatePosts: (state, action:any) => {
        const post=action.payload
      return { ...state, value: [post, ...state.value] };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchPosts.fulfilled, (state, action) => {
  //       console.log(action.payload,'payload')
  //     return {...state,value:action.payload.posts}
  //   });
  // },
})

export const { updatePosts } = postSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPposts = (state: RootState) => state.posts

export default postSlice.reducer