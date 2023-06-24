import React, { useEffect } from 'react'
import Post from '../post/Post';
import Follower from '../follower/Follower';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedDataThunk } from '../../redux/slices/feedSlice';

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector(state=>state.feedReducer.feedData);
  useEffect(()=>{
    dispatch(getFeedDataThunk())
  },[]);
  return (
   <div className="feed">
    <div className="container">
      <div className="left-side">
        { feedData.followings!=0 ?
          feedData?.posts?.map(post=><Post post={post}  key={post._id} />):
          <p>Follow someone to see their posts in your feed.</p>
        }
      </div>
      <div className="right-side">
       <div className="following">
        <h3 className="title">You are Following</h3>
      {
        feedData?.followings?.map(user=><Follower user={user} key={user._id} />)
      }
       </div>
       <div className="suggetions">
        <h3 className="title">Suggested for you</h3>
        {
        feedData?.suggestions?.map(user=><Follower user={user} key={user._id} />)
      }
       </div>
      </div>
    </div>
   </div>
  )
}

export default Feed;