import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: null
}


const usersListSlice = createSlice({
    name: "usersList",
    initialState,
    reducers: {
        setFetchedUsers: (state, action) => {
            state.users = action.payload;
        },
        replaceUpdatedUser: (state, action) => {
            // removing the updated users' old object from users
            state.users = state.users.filter((user) => (user._id !== action.payload._id))
            state.users.push(action.payload)
        },
        removeDeletedUser: (state, action) => {
            console.log(action.payload.id)
            state.users = state.users.filter((user) => (user._id !== action.payload.id))
        }
    }
})

export const { setFetchedUsers, replaceUpdatedUser, removeDeletedUser } = usersListSlice.actions;

export default usersListSlice.reducer;
