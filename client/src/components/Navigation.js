//first install npm i react-icons

import React,{useState} from "react";
import {Link} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
//import {IconContext} from "react-icons"
import {ProfileMenu} from "./ProfileMenu";
import {AdminMenu} from "./AdminMenu";
import "./Navigation.css";
// import { user } from "../../../server/src/db";
//import { FaIcons } from "react-icons/fa";
export default function Navigation(props) {
  const[sideBar,setSideBar] = useState(false);

  const click = (element) => {
    if (element.title === "Logout") {
      return props.logout;
    } else if (element.title === "Users") {
      return props.showUsers;
    }
    else return showSideBar;
  }
  const showSideBar = () => setSideBar(!sideBar);
  return !props.user.email ?(
    <div className="nav-bar">
      <div className = "nav-logo">
        <Link to ="/"> <img  src = "./images/whodo_logo.png" alt=""/> </Link>
      </div>
      <div className="nav-buttons">
        <div className="nav-button">
          <Link to={"/login"}  ><i className="fa fa-user"></i>Login</Link>
        </div>
        <div class="vl"></div>
        <div className="nav-button">
          <Link to={"/signup"}  ><i className="fas fa-user-plus"></i>Sign-Up</Link> 
        </div>
      </div>
    </div>
  ): (props.user.type === "normal" ? (
    <div className="nav-bar">
      {/* <div className="nav-bar nav-white nav-card"> */}
      <div className="nav-user">
        <Link to="#" onClick={showSideBar}><img src={props.user.profile_pic || "./default-profile-pic.png"}></img></Link>
      </div>
      {/* <IconContext.Provider> */}
      <nav className={sideBar? "nav-profile active" : "nav-profile"}>
        <ul className="nav-profile-items">
          <i style={{color:"black",fontSize:60,marginLeft:40}}class="fas fa-id-card"></i>
          <li className="nav-info"><label style={{marginRight: 65}} >Name</label> {props.user.name}</li>
          <li className="nav-info"><label style={{marginRight: 35}} >Last name </label>{props.user.last_name}</li>
          <li className="nav-info"><label style={{marginRight: 15}} >Date of birth </label>{props.user.birth_date}</li>
          <li className="nav-email">{props.user.email}</li>
          
          {ProfileMenu.map((element,i) => {
            return (
              <li key={i} className={element.cName}>
                <Link to={element.path} onClick={element.title === 'Logout' ? props.logout : showSideBar}>
                  {element.icon}
                  <span className="nav-menu">{element.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      {/* </IconContext.Provider> */}
      <div className = "nav-logo">
        <Link to ="/" > <img src = "./images/whodo_logo.png" alt=""/> </Link>
      </div>
    </div>) :
    (
    <div className="nav-bar">
      <div className="nav-side-bar">
        <Link to="#" onClick={showSideBar}>
          <FaIcons.FaBars />
        </Link>
      </div>
      
      <nav className={sideBar? "nav-profile active" : "nav-profile"}>
        <ul className="nav-profile-items">
        <li className="nav-info">Connected as</li>
        <li classeName="nav-info">{props.user.email}</li>
         {AdminMenu.map((element,i) => {
            return (
              <li key={i} className={element.cName}>
                <Link to={element.path} onClick={click(element)}>
                  {element.icon}
                  <span className="nav-menu">{element.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className = "nav-logo">
        <Link to ="/" > <img className = "img-logo" src = "./images/whodo_logo.png" alt=""/> </Link>
      </div>
      
    </div>
    
  ))
}