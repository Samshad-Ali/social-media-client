import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import {FiLogOut} from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/slices/appConfigSlice";
import logo from '../../assets/unnamed.webp'
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const myProfileData = useSelector(state=>state.appConfigReducer.myProfileData);
  const handleLogBtn =() =>{
    try {
      dispatch(logoutThunk())
      navigate('/login')
    } catch (error) {
    }
  }
  return <nav className="nav-bar">
    <div className="container flex">
      <div className="banner-box">

      <h2 className="banner cursor" onClick={()=>{navigate('/')}}>Social Hub</h2> 
      <img src={logo} alt="logo" />
      </div>
      <div className="right-side">
        <div className="profile cursor"
        onClick={()=>{navigate(`/profile/${myProfileData?._id}`)}}
        >
          <Avatar imgSrc = {myProfileData?.avatar?.url} />
        </div>
        <div className="logout cursor" onClick={handleLogBtn} >
          <FiLogOut/>
        </div>
      </div>
    </div>
  </nav>;
};

export default Navbar;
