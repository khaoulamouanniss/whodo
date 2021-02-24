import React from "react";
import "./Show.css";
export default function Show(props) {
  const {user,onUpdate} =props
  return (
    <div className ="showContainer"> 
   
      <div className="show-img">
      <img src={user.profile_pic || "./default-profile-pic.png"}></img>
      </div>
      <table  className="showtable">
        <p style={{ marginTop:"-20%", marginBottom: "-1%",fontSize:"30px"}} >{user.name}</p>
     <hr className="show-hr"/>
      <tr className="show-tr">
        <td className = "showtd" style={{fontWeight:"bolder", fontSize:"25px"}}>Name</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.name}</td>
      </tr>
      <tr>
        <td className = "showtd" style={{fontWeight:"bolder", fontSize:"25px"}}>Last Name</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.last_name}</td>
      </tr>
      <tr>
        <td className = "showtd" style={{fontWeight:"bolder", fontSize:"25px"}}> BirthDate</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.birth_date}</td>
      </tr>
      <tr>
        <td className = "showtd" style={{fontWeight:"bolder", fontSize:"25px"}}>Gender</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.gender}</td>
      </tr>
      <tr>
        <td className = "showtd" style={{fontWeight:"bolder", fontSize:"25px"}}>Email</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.email}</td>
      </tr>
    <tr>
        <td className = "showtd" style={{fontWeight:"bolder", fontSize:"25px"}}>Country</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.country}</td>
      </tr>
      <tr>
        <td className = "showtd" style={{fontWeight:"bolder", fontSize:"25px"}}>City</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.city}</td>
      </tr>
      <tr>
        <td className = "showtd" style={{fontWeight:"bolder", fontSize:"25px"}}>Relationship</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.relationship}</td>
      </tr>
    </table>
    <div className="show-edit"><i onClick={onUpdate} className="fas fa-edit"></i></div>
    
    </div>
  )
}