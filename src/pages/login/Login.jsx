import React, { useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import {axiosClient} from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";

const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

 const handleSubmit= async(e)=>{
  e.preventDefault();
  try {
    const data = await axiosClient.post('/api/auth/login',{
     email,
     password
    })
    console.log(data);
setItem(KEY_ACCESS_TOKEN,data.result.accessToken);
navigate('/')
    
  } catch (error) {
    console.log(error)
  }

  // there is a term come => CORS (Cross Origin Resource Sharing);
  // due to cors the backend will not accept the frontend request as they share on different location or IP address
 }

  return (
    <div className="login flex">
      <div className="login-box">
        <h2>Login</h2>
        <form  className="flex" onSubmit={handleSubmit} >
          <div>

          <label htmlFor="email">Email</label>
          <input required type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div>

          <label htmlFor="password">Password</label>
          <input required type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          <input className="submit" type="submit" value={"Submit"} />
          <p className="subheading">Do not have account ?  <Link to={'/signup'} className="link">Sign Up</Link> </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
