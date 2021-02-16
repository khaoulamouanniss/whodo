import React from "react";
import {Link} from "react-router-dom";
import "./Navigation.css";
// const navBody = {
//   backgroundColor:"white"
// }

// const navLogo ={
//   padding: "8px 16px",
//   float: "left",
//   width: "auto",
//   border: "none",
//   display: "block",
//   outline: "0",
//   fontSize: "25px"
// }
// const navTop ={
//   top: "0"
// }
export default function Navigation(props) {

  return !props.email ?(
  <div className="nav-top">
  <div className="nav-bar nav-white nav-card">
    <Link to ="/" className="logo"> <img className = "img-logo" src = "./images/whodo_logo.png" alt=""/> </Link>

    <Link to={"/signup"} className="nav-signup" ><i className="fa fa-user-plus"></i>Sign up</Link> 
    <Link to={"/login"} className="nav-login" ><i className="fa fa-user"></i> login</Link> 
    
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
  ):
<div className="nav-top">
<div className="nav-bar nav-white nav-card">
    <Link to ="/" className="logo"> <img className = "img-logo" src = "./images/whodo_logo.png" alt=""/> </Link>
    <label>Welcome {props.email}</label>
  <Link to={"/submit"} className="nav-login" ><i className="fa fa-user"></i> Submit</Link> 
    <Link to={"/account"} className="nav-login" > <i className="fa fa-address-book"></i> Account</Link>
    <Link to={"/"} className="nav-login" onClick={props.logout}><i className="fa fa-user"></i> Logout</Link>
</div>
</div>
}