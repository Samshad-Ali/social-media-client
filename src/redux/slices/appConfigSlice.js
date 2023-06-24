import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

export const getMyInfoThunk = createAsyncThunk('user/getMyInfo',async()=>{
    try {
        const response = await axiosClient.get('/api/user/getMyinfo');
        return response.result;

    } catch (error) {
        return Promise.reject(error)
    }
})

export const updateMyProfileThunk = createAsyncThunk('user/updateProfile',async(body)=>{
    try {
        const response = await axiosClient.put('/api/user/updateProfile',body);
        return response.result;
    } catch (error) {
        return Promise.reject(error)
    }
})

export const logoutThunk = createAsyncThunk('user/logout',async()=>{
    try {
        await axiosClient.post('/api/auth/logout')
        removeItem(KEY_ACCESS_TOKEN);
    } catch (error) {
        
    }
})

const appConfigSlice = createSlice({
    name:'appConfigSlice',
    initialState:{
        isLoading:false,
        myProfileData:null,
        toastData:{}
    },
    reducers:{
        setLoading:(state,action)=>{
            state.isLoading = action.payload;
        },
        showToast:(state,action)=>{
            state.toastData = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getMyInfoThunk.fulfilled,(state,action)=>{
            state.myProfileData=action.payload.user;
        })
        .addCase(updateMyProfileThunk.fulfilled,(state,action)=>{
            state.myProfileData=action.payload.user;
        })
    }
})
export default appConfigSlice.reducer;
export const {setLoading,showToast} = appConfigSlice.actions;