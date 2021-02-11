import React from "react";
import {Link} from "react-router-dom";
import "./Navigation.css";
//import SignUp from "./SignUp";

export default function Navigation() {

  return (
  <div className="nav-top">
  <div className="nav-bar nav-white nav-card">
    <a href="#home" className="logo"> <img classNameName = "img-logo" src = "./images/whodo_logo.png" alt=""/> </a>
    <Link to={"/signup"} className="nav-signup" ><i className="fa fa-th"></i>Sign up</Link> 
    <Link to={"/login"} className="nav-login" ><i className="fa fa-user"></i> login</Link> 
    <Link to={"/submit"} className="nav-login" ><i className="fa fa-user"></i> Submit</Link> 
    {/* <Popup trigger={<a className="nav-login" ><i className="fa fa-user"></i> login</a> } position = "left center">
   <div><Login /> </div>
   </Popup>
   <Popup trigger={<a className="nav-signup" ><i className="fa fa-th"></i>Sign up</a> } position = "left center">
   <div><SignUp /> </div>
   </Popup>  */}
    
</div>
</div>
  // <div>
  //      <img classNameName = "img-logo"
  //      src = "/images/whodo_logo.png" alt=""/>
  //       <Popup trigger={<button classNameName = "login-button">Login</button>} position = "left center">
  //        <div><Login /></div>
  //       </Popup>
  //       <Popup trigger={<button classNameName = "signup-button">Sign Up</button>} position="left center">
  //        <div><SignUp /></div>
  //       </Popup>
  //      <button classNameName = "signup-button">Sign Up</button> 
  //      <button classNameName = "login-button">Login</button> 
  //   </div> 
  )
}