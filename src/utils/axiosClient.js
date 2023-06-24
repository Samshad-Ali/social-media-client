import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";
import store from '../redux/store' 
import { setLoading, showToast } from "../redux/slices/appConfigSlice";
import { TOAST_FAILURE } from "../App";



export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
  //  if we not set the withCredentials then cookies not send by the backend to frontend.
});

// ------ Interceptor-------

// if we want to do some multipe call or work silently with frontend to backend then we have to use Interceptor
// there are two type of interceptor ->
// Request Interceptor -> which intercept request
// Response Interceptor-> which intercept response
// it is one time work and it take responsibilities of all api to do so

// //---------- Request Interceptor
// before we go on the backend to fetch the data the interceptor come which we done by frontend and set the accesstoken and whatever to add to done the backend work properly.
// as we set the accesstoken in bearer in insomnia just like that we here set the accesstoken in Authorization so that backend got the accesstoken to further check.
// Request Interceptor work before go to the backend
axiosClient.interceptors.request.use((request) => {
  // console.log("from request inceptor", request);
  store.dispatch(setLoading(true))
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

//--------Response Interceptor------
// before it go to the frontend from getting repsonse from the backend in between the response interceptor work whatever work given to it.
axiosClient.interceptors.response.use(async (response) => {
  // console.log("from response interceptor", response);
  store.dispatch(setLoading(false))

  const data = response.data;
  if (data.status === "ok") {
    return data;
  }
  const originalRequest = response.config;
  const statusCode = data.statusCode;
  const error = data.message;
  store.dispatch(showToast({
    type:TOAST_FAILURE,
    message:error
  }))
  if (statusCode === 401 && !originalRequest._retry) {
    // means the accessToken expired only.  so we silently call the refresh api so that it can re-generate the accesstoken  and further post or work will done.
    originalRequest._retry = true;
    const response = await axios
      .create({
        withCredentials: true,
      })
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/refresh`);
    console.log("accessToken expired : ", response);
    if (response.data.status === "ok") {
      // if status is ok then we go further because it status is error it means also that refreshtoken expired and go to login page
      setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.result.accessToken}`;
      return axios(originalRequest);
    } else {
      // if this condition true it means that the error come from refreshTokenGeneratorController which the refresh api so it show that refreshToken is expired and then user have to  again login in to access further.
      // when refresh token expire we will send the user on logIn page
      removeItem(KEY_ACCESS_TOKEN);
      alert("refresh token expired...log in again");
      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
},async(error)=>{
  store.dispatch(setLoading(false))
  store.dispatch(showToast({
    type:TOAST_FAILURE,
    message:error.message 
  }))
  return Promise.reject(error);
}
);

