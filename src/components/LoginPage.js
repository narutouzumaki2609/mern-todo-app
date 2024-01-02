import { useState } from 'react';
import React from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { authActions } from './store';
const LoginPage = () => {
  const Dispatch=useDispatch();
  const navigate=useNavigate()
  const [Inputs,setInputs] = useState({email:"",password:""});
  const change=(e)=>{
    setInputs({...Inputs,[e.target.name]:e.target.value})
  }
  const login = async(e) => {
    e.preventDefault();
    console.log(Inputs)
    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', Inputs);
      console.log(response);
      sessionStorage.setItem('id',response.data.others._id)
      console.log(response.data.others._id)
      Dispatch(authActions.login())
      setInputs({email: "", password: "" });
        navigate('/Todo')
      
    } catch (error) {
      console.error("Error during login", error);
    }
  }
  return (
    
    <div className='f container'>
    <div className="login form">
      <div className='login2'>Login</div>
      <form onSubmit={login}>
      <input type="email" name='email' value={Inputs.email} placeholder="Enter your email" onChange={change}/>
        <input type="password" name='password' value={Inputs.password} placeholder="Create a password" onChange={change}/>
        <input type="button" className="button" onClick={login} value="Login"/>
      </form>
      <div className="signup">
        <span className="signup">Don't have an account?
         <label for="check"><Link to={"/Signup"}><b>SignUp</b></Link></label>
        </span>
      </div>
    </div>
    </div>
  )
}

export default LoginPage