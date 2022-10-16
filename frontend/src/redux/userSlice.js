import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData:null,
    loading:false,
    error:false,
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        loginStart:(state) => {
            state.loading = true;
        },
        loginSuccess: (state,action) => {
            state.loading = false;
            state.userData = action.payload;
        },
        loginFailure: (state) => {
            state.error = true;
            state.loading = false;
        },
        logout:(state) => {
            state.userData = null;
            state.loading = false;
            state.error = false;
        },
    },
});

export const {loginStart , loginSuccess , loginFailure , logout } = userSlice.actions;

export default userSlice.reducer;