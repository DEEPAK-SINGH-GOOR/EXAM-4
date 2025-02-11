import React, { useState } from 'react'
import API from "../config/api"
import Cookie from "js-cookie"
import '../CSS/Signup.css'
import { useNavigate } from "react-router-dom";



const Login = () => {
  const nav = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleinput = (e) => {
    let { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const createUser = async (data) => {
    try {
      let res = await API.post("/users/login", data);
      const { user, token } = res.data;
      console.log(user, token);
      Cookie.set("token", token,  { expires: 30 });
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault()
    createUser(user)
  }
  return (
    <div>
      <form className='Login-form' onSubmit={onSubmit}>
        <input className='' type="email" name='email' value={user.email} onChange={handleinput} placeholder='Email' />
        <input type="password" name='password' value={user.password} onChange={handleinput} placeholder='Password' />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login