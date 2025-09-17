import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
}

const UserSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        changeUserData: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
    },
})

export const { changeUserData } = UserSlice.actions;
export default UserSlice.reducer;