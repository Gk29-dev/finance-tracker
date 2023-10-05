import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Navbar(){
    const navigate = useNavigate();

    const logout = () => {
        if(window.confirm('Are you sure to logout from the system?')){
            const jwtToken = localStorage.getItem('user_jwt_token');
            if(jwtToken){
               localStorage.removeItem('user_jwt_token');
               localStorage.removeItem('user_email');
               toast('Logout from the system');
               navigate('/login');
            }else{
               navigate('/login');
            }
        }
      
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <Link to="/dashboard" className="navbar-brand">
               Finance Tracker
            </Link>
            <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
            </nav>
        </div>
    )
}

export default Navbar;