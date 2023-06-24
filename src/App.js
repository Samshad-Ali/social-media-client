import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import Home from "./pages/home/Home";
import RequiredUser from "./components/RequiredUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/editProfile/EditProfile";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
import { FiLogOut,FiPlusSquare} from 'react-icons/fi';
import {BiEdit} from 'react-icons/bi';
import LoadingBar from "react-top-loading-bar";
import { Toaster, toast } from "react-hot-toast";
import RequiredAuth from "./components/RequiredAuth";
import Avatar from "./components/avatar/Avatar";
import { logoutThunk } from "./redux/slices/appConfigSlice";

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";
const App = () => {
  const loadingRef = useRef(null);
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message);
        break;
    }
  }, [toastData]);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
      //loadingRef.current?.continuousStart() - if means that if loadingRef is null then don't call the function
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);




  return (
    <div className="App">
      <PhonNavBar  />
      <LoadingBar height={3} color="#800080" ref={loadingRef} />
      <Toaster />
      <Routes>
        <Route element={<RequiredUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/editProfile" element={<EditProfile />} />
          
          </Route>
        </Route>
        <Route element={<RequiredAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route
          path="*"
          element={<h1 className="not-found">Page Not Found 404</h1>}
        />
      </Routes>
    </div>
  );
};

export default App;

const PhonNavBar = () => {
  const navigate=useNavigate();
  const dispatch= useDispatch();
  const myProfileData = useSelector(state=>state.appConfigReducer.myProfileData);
  const handleLogOutBtn = () => {
    dispatch(logoutThunk());
    navigate('/login')
};

    return (
      <div className='phone-Nav'>
      <ul>
      <li onClick={()=>{navigate('/')}}>
      <AiOutlineHome/>
      </li>
      <li onClick={()=>{navigate('/editProfile')}}>
      <BiEdit/>
      </li>
      <li onClick={()=>{navigate(`/profile/${myProfileData?._id}`)}}>
      <Avatar imgSrc={myProfileData?.avatar?.url} />
      </li>
      <li className="log" onClick={handleLogOutBtn}>
      <FiLogOut/>
      </li>
      </ul>
      </div>
      );
    };
