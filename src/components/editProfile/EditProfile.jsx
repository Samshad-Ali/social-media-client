import React, { useState,useEffect } from 'react'
import userImg from '../../assets/user.png'
import { useDispatch, useSelector } from 'react-redux';
import {updateMyProfileThunk } from '../../redux/slices/appConfigSlice';
import { axiosClient } from '../../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';
const EditProfile = () => {
    const myProfileData = useSelector(state=>state.appConfigReducer.myProfileData);
    const [name,setName]=useState('');
    const [bio,setBio] = useState('');
    const [img,setImg] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const handleDeleteBtn=async({})=>{
        await axiosClient.delete('/api/user/deleteProfile');
        removeItem(KEY_ACCESS_TOKEN);
        navigate('/signup')
    }

    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file); 
        fileReader.onload=()=>{
            if(fileReader.readyState === fileReader.DONE){
                setImg(fileReader.result);
            }
        }
    }

    const handleSubmitBtn = (e) =>{
        try {
            e.preventDefault();
          dispatch(updateMyProfileThunk({name,bio,img}))
        } catch (error) {
            
        }finally{
            setBio('');
            setName('')
        }
    }

    useEffect(()=>{
        setName(myProfileData?.name || '');
        setBio(myProfileData?.bio || '');
        setImg(myProfileData?.avatar?.url)
    },[myProfileData])
  return (
    <div className='edit-profile'>
        <div className="container">
            <div className="left-side">
                <div className="input-user-img">
                    <label htmlFor="userImg" className='labelImg cursor'>
                        <img src={img?img:userImg} alt="profile-img" className='cursor' />
                    </label>
                    <input type="file" id="userImg" accept='image/*' onChange={handleImageChange} className='input-img' />
                </div>
            </div>
            <div className="right-side">
                <form className='handleSubmitBtn'>
                    <input type="text" value={name} placeholder='Your name' onChange={(e)=>{setName(e.target.value)}} />
                    <input type="text" value={bio} placeholder='Your bio' onChange={(e)=>{setBio(e.target.value)}} />
                    <input type="submit"  
                    value={"Submit"}
                    className='primary-btn submit cursor' onClick={handleSubmitBtn} />
                </form>
                <button className='delete-btn cursor' onClick={handleDeleteBtn}>Delete Account</button>
            </div>
        </div>
    </div>
  )
}

export default EditProfile;