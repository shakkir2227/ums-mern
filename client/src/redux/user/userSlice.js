import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = false
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
        },
        updateUserStart: (state, action) => {
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userSignOut: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false
        }
    }
})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    userSignOut
} = userSlice.actions
export default userSlice.reducer;