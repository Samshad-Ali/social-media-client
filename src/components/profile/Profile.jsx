import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileThunk } from '../../redux/slices/potsSlice'
import { followUnfollowUserThunk } from '../../redux/slices/feedSlice'
const Profile = () => {
      const [isMyProfile,setIsMyProfile] = useState(false);
      const [isFollow,setIsFollow] = useState(false);
      const feedData = useSelector(state=>state.feedReducer.feedData);
      const navigate = useNavigate();
      const params = useParams();
      const dispatch = useDispatch();
      const userProfile = useSelector(state=>state.postReducer.userProfile)
      const myProfileData = useSelector(state=>state.appConfigReducer.myProfileData)
      
        const handleFollowBtn = () =>{
          dispatch(followUnfollowUserThunk({
            userIdToFollow:params.userId
          }))
        }
      useEffect(()=>{
        dispatch(getUserProfileThunk({
          userId:params.userId
        }))
        setIsMyProfile(myProfileData?._id === params.userId);
    setIsFollow(feedData?.followings?.find(item=>item._id===params.userId))
      },[myProfileData,params.userId,feedData]);
  return (
    <div className='profile'>
      <div className="container">
        <div className="left-side">
          {
            isMyProfile &&  <CreatePost/> 
          }
         
          {
             userProfile?.posts?.map(post=><Post post={post} key={post._id} />)
          }
        </div>
        <div className="right-side">
          <div className="profile-card">
            <img className='user-img' src={userProfile?.avatar?.url} alt="" />
            <h3 className='user-name'>{userProfile?.name}</h3>
            <p>{userProfile?.bio}</p>
            <div className="follow-info">
              <h4>{`${userProfile?.followers?.length} Follewers`}</h4>
              <h4>{`${userProfile?.followings?.length} Following`}</h4>
            </div>
            <div className="btn-box">
            {
              isMyProfile &&
              <button className='secondary-btn cursor' onClick={()=>{navigate('/editProfile')}}>Edit Profile</button>
            }
            {
              !isMyProfile &&
              <button onClick={handleFollowBtn} className={ isFollow ?  'secondary-btn cursor':'primary-btn cursor'}>{isFollow?"Unfollow":"Follow"}</button>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;