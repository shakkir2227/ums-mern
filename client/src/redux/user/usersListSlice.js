import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   users : null
}


const usersListSlice = createSlice({
    name: "usersList",
    initialState,
    reducers: {
        setFetchedUsers: (state, action) => {
            state.users = action.payload;
        }
    }
})

export const { setFetchedUsers } = usersListSlice.actions;

export default usersListSlice.reducer;
