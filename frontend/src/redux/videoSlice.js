import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    videoData:null,
    loading:false,
    error:false,
}

export const videoSlice = createSlice({
    name : "video",
    initialState,
    reducers:{
        fetchStart:(state) => {
            state.loading = true;
        },
        fetchSuccess: (state,action) => {
            state.loading = false;
            state.videoData = action.payload;
        },
        fetchFailure: (state) => {
            state.error = true;
            state.loading = false;
        },
        like:(state,action) => {
            if(!state.videoData.likes.includes(action.payload)){
                state.videoData.likes.push(action.payload);
                state.videoData.dislikes.splice(
                    state.videoData.dislikes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }else{
                state.videoData.likes.splice(
                    state.videoData.likes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );               
            }
        },
        dislike:(state,action) => {
            if(!state.videoData.dislikes.includes(action.payload)){
                state.videoData.dislikes.push(action.payload);
                state.videoData.likes.splice(
                    state.videoData.likes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            }else{
                state.videoData.dislikes.splice(
                    state.videoData.dislikes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );                
            }
        },
    },
});

export const {fetchStart , fetchSuccess , fetchFailure , like , dislike } = videoSlice.actions;

export default videoSlice.reducer;