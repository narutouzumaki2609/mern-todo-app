import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'

import './Navbar.css'
import { authActions } from './store';
export default function Navbar() {
    const Dispatch=useDispatch();
    const logout=()=>{
        sessionStorage.clear('id')
        Dispatch(authActions.logout())
    }
    const isLoggedIn=useSelector((state)=>state.isLoggedIn);
    console.log(isLoggedIn)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className='container'>
                <a className="navbar-brand" href="#">
                    <b>TODO</b>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto  mb-2 mb-lg-0">
                        <li className="nav-item active mx-2">
                            <Link className="nav-link" to="/">Home </Link>
                        </li>
                        <li className="nav-item active mx-2">
                            <Link className="nav-link" to="/Todo">Todo</Link>
                        </li>
                        {!isLoggedIn && (
                            <>
                            <li className="nav-item active mx-2">
                            <Link className="nav-link btn-nav" to="/SignUp">SignUp</Link>
                        </li>
                        <li className="nav-item active mx-2">
                            <Link className="nav-link btn-nav" to="/Login">SignIn </Link>
                        </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <li className="nav-item active mx-2">
                            <Link className="nav-link btn-nav" to="" onClick={logout}>Logout</Link>
                        </li>
                        )}
                        
                        
                        

                    </ul>
                    
                </div>
                </div>
            </nav>
        </div>
    )
}
