import React from "react";
import {Link} from "react-router-dom";
import "./Navigation.css";
export default function Navigation(props) {
  return !props.email ?(
  <div className="nav-top">
  <div className="nav-bar">
    <Link to ="/"> <img className = "nav-logo" src = "./images/whodo_logo.png" alt=""/> </Link>
​
    <Link to={"/signup"} className="nav-signup" ><i class="fas fa-user-plus"></i>Sign-Up</Link> 
    <Link to={"/login"} className="nav-login" ><i className="fa fa-user"></i>Login</Link>
    
</div>
</div>
  ):
<div className="nav-top">
  <div className="nav-bar nav-white nav-card">
    <Link to ="/" className="logo"> <img classNameName = "img-logo" src = "./images/whodo_logo.png" alt=""/> </Link>
    <label>Welcome {props.email}</label>
  <Link to={"/submit"} className="nav-login" ><i className="fa fa-user"></i> Submit</Link> 
    <Link to={"/account"} className="nav-login" > <i className="fa fa-address-book"></i> Account</Link>
    <Link to={"/"} className="nav-login" onClick={props.logout}><i className="fa fa-user"></i> Logout</Link>
</div>
</div>
}