import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getUserProfileThunk = createAsyncThunk('user/getUserProfile',async(body)=>{
    try {
        const response = await axiosClient.post('/api/user/getUserProfle',body);
        return response.result;

    } catch (error) {
        return Promise.reject(error)
    }
})

export const likeAndDislikeThunk = createAsyncThunk('user/likeDislike',async(body)=>{
    try {
        const response = await axiosClient.post('/api/post/like',body);
        return response.result.post;

    } catch (error) {
        return Promise.reject(error)
    }
})

const postsSlice = createSlice({
    name:'postsSlice',
    initialState:{
       userProfile:{}
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserProfileThunk.fulfilled,(state,action)=>{
            state.userProfile=action.payload;
        })
        .addCase(likeAndDislikeThunk.fulfilled,(state,action)=>{
            const post = action.payload;
            const index = state?.userProfile?.posts?.findIndex(item=>item._id===post._id);
            if( index!==undefined && index !== -1){
                state.userProfile.posts[index] = post;
            }
        })
    }
})
export default postsSlice.reducer;