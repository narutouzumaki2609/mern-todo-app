import React from "react";

import './Home.css';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const Home=()=>{
    const navigate=useNavigate();
    const Check=()=>{
        navigate('/Todo')
    }
    return(
        <div className="container">
    <div className="home d-flex justify-content-center align-items-center">
        <div className="container d-flex justify-content-center align-items-center flex-column ">
            <h1 className="test-center">
                Let's Organize the work

            </h1>
            <p>
                Become focused, organized, and calm with Saurabh<br />
                Pandey's todo app. The Ultimate task manager app .
            </p>

            <button class="home-btn p-2" onClick={Check}>Make Todo List</button>

        </div>

    </div >
    </div>
)}
export default Home