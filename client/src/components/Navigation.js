import React from "react";
import "./Navigation.css"


export default function Navigation() {
  return (
    <div>
      <img className = "img-logo"
       src = "/images/whodo_logo.png" alt=""/>
       <button className = "signup-button">Sign Up</button>
       <button className = "login-button">Login</button>
    </div>
  )
}