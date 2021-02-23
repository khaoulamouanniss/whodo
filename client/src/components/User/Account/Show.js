import React from "react";
import "./Show.css";
export default function Show(props) {
  const {user,onUpdate} =props
  return (
    <div className ="showContainer"> 
   
      <div className="show-img">
      <img src={user.profile_pic}></img>
      </div>
      <table  className="showtable">
        <p style={{fontSize:"100%", marginTop:"-30%", marginLeft:"60%", textAlign:"center"}} >{user.name}</p>
     <hr />
      <tr>
        <td className = "showtd">Name</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.name}</td>
      </tr>
      <tr>
        <td className = "showtd">Last Name</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.last_name}</td>
      </tr>
      <tr>
        <td className = "showtd"> BirthDate</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.birth_date}</td>
      </tr>
      <tr>
        <td className = "showtd">Gender</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.gender}</td>
      </tr>
      <tr>
        <td className = "showtd">Email</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.email}</td>
      </tr>
    <tr>
        <td className = "showtd">Country</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.country}</td>
      </tr>
      <tr>
        <td className = "showtd">Region</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.region}</td>
      </tr>
      <tr>
        <td className = "showtd">City</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.city}</td>
      </tr>
      <tr>
        <td className = "showtd">Relationship</td>
        <td className = "showtd" style={{fontWeight:"normal"}}>{user.relationship}</td>
      </tr>
    </table>
    <div className="show-edit"><i onClick={onUpdate} className="fas fa-edit"></i></div>
    
    </div>
  )
}