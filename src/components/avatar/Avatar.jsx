import React from 'react'
import userImg from '../../assets/user.png'
const Avatar = ({imgSrc}) => {
  return (
    <div className='avatar'>
        <img src={imgSrc?imgSrc:userImg} alt="profile-photo" />
    </div>
  )
}

export default Avatar