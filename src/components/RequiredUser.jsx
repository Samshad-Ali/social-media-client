import React from 'react';
import { KEY_ACCESS_TOKEN, getItem } from '../utils/localStorageManager';
import { Outlet, useNavigate } from 'react-router-dom';

const RequiredUser = () => {
    const user = getItem(KEY_ACCESS_TOKEN);
    const navigate = useNavigate()
  return (
    user?<Outlet/>: navigate('/login')
  )
}

export default RequiredUser;