import React, { useState } from "react";
import API from "../config/api";
import Cookies from "js-cookie";
import '../CSS/Signup.css'
const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const createUser = async (data) => {
    console.log(data);

    let res = await API.post("/users/signup", data);
    const { user, token } = res.data;
    console.log(user, token);
    Cookies.set("token", token, { expires: 30 });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    createUser(user);
  };
  return (
    <div>
      <form className='signup-form' onSubmit={onSubmit}>
        <input type="text" name="name" value={user.name} onChange={handleInput} placeholder="Name"
        />
        <input type="email" name="email" value={user.email} onChange={handleInput} placeholder="Email"
        />
        <input type="text" name="password" value={user.password} onChange={handleInput} placeholder="Password"
        />
        <input type="submit" value={"signup"} />
      </form>
    </div>
  );
};

export default Signup;