import React from "react";
import {Link} from "react-router-dom";
import "./Navigation.css";
export default function Navigation(props) {
  return !props.user.email ?(
  <div className="nav-top">
  <div className="nav-bar">
    
    <Link to ="/"> <img className = "nav-logo" src = "./images/whodo_logo.png" alt=""/> </Link>
​
    <Link to={"/signup"} className="nav-signup" ><i class="fas fa-user-plus"></i>Sign-Up</Link> 
    <Link to={"/login"} className="nav-login" ><i className="fa fa-user"></i>Login</Link>
    
</div>
</div>
  ): (props.user.type === "normal" ? (
<div className="nav-top">
  <div className="nav-bar nav-white nav-card">
    <img src="./images/profile_pic/deepthy.jpg"></img>
    <Link to ="/" className="logo"> <img className = "img-logo" src = "./images/whodo_logo.png" alt=""/> </Link>
    <label>Welcome {props.email}</label>
  <Link to={"/submit"} className="nav-login" ><i className="fa fa-check-circle"></i> Submit</Link> 
  <Link to={"/myitems"} className="nav-login" ><i className="fa fa-bars"></i> My items</Link> 
    <Link to={"/account"} className="nav-login" > <i className="fa fa-address-book"></i> Account</Link>
    <Link to={"/"} className="nav-login" onClick={props.logout}><i className="fa fa-circle-o-notch"></i> Logout</Link>
</div>
</div>) : (
<div className="nav-top">
  <div className="nav-bar nav-white nav-card">
    <Link to ="/" className="logo"> <img className = "img-logo" src = "./images/whodo_logo.png" alt=""/> </Link>
    <label>Welcome {props.email}</label>
  <Link to={"/topics"} className="nav-login" ><i className="fa fa-user"></i> Topics</Link> 
    <Link to={"/items"} className="nav-login" > <i className="fa fa-bars"></i> Items</Link>
    <Link to={"/itemstoapprove"} className="nav-login" ><i className="fa fa-check-circle"></i> Approve</Link>
    <Link to={"/users"} className="nav-login" onClick={props.showUsers}><i className="fa fa-user"></i> Users</Link> 
    <Link to={"/"} className="nav-login" onClick={props.logout}><i className="fa fa-circle-o-notch"></i> Logout</Link>
</div>
</div>))
}