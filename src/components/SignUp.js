import React from 'react'
import { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
const SignUp = () => {
  const navigate=useNavigate()
  const [Inputs,setInputs] = useState({username:"",email:"",password:""});
  const change=(e)=>{
    setInputs({...Inputs,[e.target.name]:e.target.value})
  }
  const register = async(e) => {
    e.preventDefault();
    console.log(Inputs)
    try {
      const response = await axios.post('http://localhost:4000/api/v1/register', Inputs);
      console.log(response);
      if(response.data.message==="User Already Exists"){
        alert(response.data.message)
      }
      else{
        alert(response.data.message)
        setInputs({ username: "", email: "", password: "" });
        navigate('/login')
      }
      
    } catch (error) {
      console.error("Error during registration:", error.response.data);
    }
    
}
  return (
    <div className='f container'>
         <div className="login form">
      <div className='login2'><h3>SignUp</h3></div>
      <form onSubmit={register}>
        <input type="text" name='username' value={Inputs.username} placeholder="Enter your username" onChange={change}/>
        <input type="email" name='email' value={Inputs.email} placeholder="Enter your email" onChange={change}/>
        <input type="password" name='password' value={Inputs.password} placeholder="Create a password" onChange={change}/>
        <input type="button" className="button" onClick={register} value="Signup"/>
        {/* <button className='home-btn'>Submit</button> */}
      </form>
      <div className="signup">
        <span className="signup">Already have an account?
         <label for="check"><Link to={"/Login"}><b>Login</b></Link></label>
        </span>
      </div>
    </div>
    </div>
  )
}

export default SignUp