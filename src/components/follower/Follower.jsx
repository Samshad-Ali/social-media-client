import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { followUnfollowUserThunk } from '../../redux/slices/feedSlice';
import { useNavigate } from 'react-router-dom';

const Follower = ({user}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedData = useSelector(state=>state.feedReducer.feedData);
  const [isFollowing,setIsFollowing] = useState();

  const handleFollowBtn = () =>{
    dispatch(followUnfollowUserThunk({
      userIdToFollow:user._id
    }))
  }

  useEffect(()=>{
    if(feedData.followings.find(item=>item._id===user._id)){
      setIsFollowing(true)
    }else{
      setIsFollowing(false)
    }
    // other short way to do so this 
    // setIsFollowing(feedData.followings.find(item=>item._id===user._id))
  },[feedData])
  return (
    <div className='follower'>
        <div className='cursor' onClick={()=>{navigate(`/profile/${user._id}`)}}>
        <Avatar imgSrc={user?.avatar?.url} />
        <h4 className='name'>{user?.name}</h4>
        </div>
      <button onClick={handleFollowBtn} className={ isFollowing ?  'secondary-btn cursor':'primary-btn cursor'}>{isFollowing?"Unfollow":"Follow"}</button>
    </div>
  )
}

export default Follower