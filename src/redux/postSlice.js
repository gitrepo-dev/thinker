import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    currentPost: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getPosts: (state, action) => {
            state.posts =  action?.payload 
        },
        updatePosts: (state, action) => {
            state.posts = state.posts.concat(action?.payload)
        },
        getPostbyID: (state, action) => {
            state.posts = [action?.payload]
        },
        getPaginationPosts: (state, action) => {            
            state.currentPost = action?.payload
        }
    }
})


export const { getPosts, updatePosts, getPostbyID, getPaginationPosts } = postSlice.actions;
export default postSlice.reducer;