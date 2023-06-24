import { configureStore } from '@reduxjs/toolkit'
import appConfigSlice from './slices/appConfigSlice'
import postsSlice from './slices/potsSlice';
import feedSlice from './slices/feedSlice';
export default configureStore({
    reducer:{
        appConfigReducer:appConfigSlice,
        postReducer:postsSlice,
        feedReducer:feedSlice
    }
});