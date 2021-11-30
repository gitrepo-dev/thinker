import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        storeRegistrationCredential: (state, action)=>{
            const { name, email, token} = action?.payload
            localStorage.setItem('user-agent', JSON.stringify({name, email, token}))
            state.user = {name, email, token}
        },
        storeLoginCredential: (state, action) => {
            const { name, email, token} = action?.payload
            localStorage.setItem('user-agent', JSON.stringify({name, email, token}))
            state.user = {name, email, token}
        },
        logOutUser: (state)=>{
            localStorage.setItem('user-agent', "")
            state.user = {}
        }
    }
})


export const { storeRegistrationCredential, storeLoginCredential, logOutUser } = userSlice.actions;
export default userSlice.reducer;