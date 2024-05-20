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
        }
    }
})

export const { setFetchedUsers, replaceUpdatedUser } = usersListSlice.actions;

export default usersListSlice.reducer;
