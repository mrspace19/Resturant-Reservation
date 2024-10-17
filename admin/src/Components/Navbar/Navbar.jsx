import React from "react";
import './Navbar.css';
import navlogo from "../../assets/logo.png"
import admin from '../../assets/admin.jpg'
import dropdown from '../../assets/down.png'
import { Link } from "react-router-dom";
const Navbar =()=>{
    return(
        <div className="navbar">
           <Link to={'/map'}>
            <div className="logo">
            <img src={navlogo} alt="" className="nav-logo" />
            <p>Resturant</p>
            </div>
           </Link>
            <div className="profile">
            <img src={admin} alt="" className="nav-profile" width="35" height="35" viewBox="0 0 35 35" fill="none" style={{borderRadius:"50%"}}/>
            <img src={dropdown} alt="" className="nav-profile" width="15" height="12" viewBox="0 0 25 20" fill="none" />
            </div>
        </div>
    )
}
export default Navbar