import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMyInfoThunk } from "../../redux/slices/appConfigSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getMyInfoThunk());
  },[])
  return(
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
};

export default Home;
