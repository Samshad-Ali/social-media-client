import React, { useState } from 'react'
import Avatar from '../avatar/Avatar'
import {BsCardImage} from 'react-icons/bs';
import { axiosClient } from '../../utils/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileThunk } from '../../redux/slices/potsSlice';
const CreatePost = (e) => {
    const [postImg,setPostImg] = useState('');
    const [caption,setCaption] = useState('');
    const dispatch = useDispatch();
    const myProfile = useSelector(state=>state.appConfigReducer.myProfileData)
    const handlePostImageChange = (e) =>{
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file); 
      fileReader.onload=()=>{
          if(fileReader.readyState === fileReader.DONE){
              setPostImg(fileReader.result);
          }
      }
    }

    const handlePostBtn = async(e) =>{
      try {
         await axiosClient.post('/api/post/create',{
          caption,
          postImg
        });
        dispatch(getUserProfileThunk({
          userId : myProfile?._id
        }))
      } catch (error) {
        
      }finally{
        setCaption('');
        setPostImg('');
      }
    }

  return (
    <div className='create-post'>
        <div className="left-side">
            <Avatar imgSrc={myProfile?.avatar?.url} />
        </div>
        <div className="right-side">
        <input type="text" value={caption} placeholder='Add caption here..' onChange={(e)=>{setCaption(e.target.value)}} />
         {
          postImg &&
          <div className="image-container">
          <img src={postImg} alt="post-img" className='post-img' />
        </div>
         }
        <div className="bottom-side">
        <div className="input-post-img">
                    <label htmlFor="userImg" className='labelImg cursor'>
                      <BsCardImage/>
                    </label>
                    <input type="file" id="userImg" accept='image/*' onChange={handlePostImageChange} className='input-img' />
          </div>
          <button className="post-btn primary-btn cursor" onClick={handlePostBtn}>Post</button>
        </div>
        </div>
    </div>
  )
}

export default CreatePost;