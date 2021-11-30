import { configureStore } from '@reduxjs/toolkit'
import postSlice from './redux/postSlice'
import userSlice from './redux/userSlice'

export const store = configureStore({
    reducer: {
        post: postSlice,
        user: userSlice
    }
})