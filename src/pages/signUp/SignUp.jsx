import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedData = await axiosClient.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setItem(KEY_ACCESS_TOKEN,fetchedData.result.accessToken);
navigate('/')
      // ------- another way to do so
      // const fetchedData = await axios.post('http://localhost:4000/api/auth/signup',{
      //   name,
      //   email,
      //   password
      // })
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="signUp flex">
      <div className="signUp-box">
        <h2>Sign Up</h2>
        <form className="flex" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input className="submit" type="submit" value={"Submit"} />
          <p className="subheading">
            Already have an account ?{" "}
            <Link to={"/login"} className="link">
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
