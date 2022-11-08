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
        addSubscriptions:(state,action) => {
            if(state.userData.subscriberedUsers.includes(action.payload)){
                state.userData.subscriberedUsers.splice(
                    state.userData.subscriberedUsers.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                )
            }else{
                state.userData.subscriberedUsers.push(action.payload);
            }
        }
    },
});

export const {loginStart , loginSuccess , loginFailure , logout , addSubscriptions } = userSlice.actions;

export default userSlice.reducer;