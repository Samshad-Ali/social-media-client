import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { likeAndDislikeThunk } from "./potsSlice";

export const getFeedDataThunk = createAsyncThunk('user/getFeedData',async()=>{
    // we are feed our feed section with i follow,or following user post or data
    try {
        const response = await axiosClient.get('/api/user/getPostsOfFollowing');
        return response.result;

    } catch (error) {
        return Promise.reject(error)
    }
});

export const followUnfollowUserThunk = createAsyncThunk('user/followUnfollow',async(body)=>{
    try {
       const response = await axiosClient.post('/api/user/follow',body);
        return response.result.user;
    } catch (error) {
        return Promise.reject(error)
    }
})

const feedSlice = createSlice({
    name:'feedSlice',
    initialState:{
        feedData:{}
    },
    extraReducers:(builder)=>{
        builder.addCase(getFeedDataThunk.fulfilled,(state,action)=>{
            state.feedData=action.payload;
        }) 
        .addCase(likeAndDislikeThunk.fulfilled,(state,action)=>{
            const post = action.payload;
            const index = state.feedData?.posts?.findIndex(item=>item._id===post._id)
            if( index!==undefined && index !== -1){
                state.feedData.posts[index] = post;
            }
        })
       .addCase(followUnfollowUserThunk.fulfilled,(state,action)=>{
         const user = action.payload;
         const index = state?.feedData?.followings.findIndex(item=>item._id===user._id);
         if(index !== -1){
            state?.feedData.followings.splice(index,1)
         }else{
            state?.feedData.followings.push(user);
         }
       })
    }
}) 
export default feedSlice.reducer;