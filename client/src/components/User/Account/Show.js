import React from "react";
import "./Show.css";
export default function Show(props) {
  const {user,onUpdate} =props
  return (
    <div className ="showContainer"> 
      <table  className="showtable">
        <tr>
          <img src={user.profile_pic}></img>
        </tr>
      <tr>
        <td className = "showtd">  Name:</td>
        <td className = "showtd">{user.name}</td>
      </tr>
      <tr>
        <td className = "showtd">Last Name:</td>
        <td className = "showtd">{user.last_name}</td>
      </tr>
      <tr>
        <td className = "showtd"> BirthDate:</td>
        <td className = "showtd">{user.birth_date}</td>
      </tr>
      <tr>
        <td className = "showtd">Gender:</td>
        <td className = "showtd">{user.gender}</td>
      </tr>
      <tr>
        <td className = "showtd">Email:</td>
        <td className = "showtd">{user.email}</td>
      </tr>
      {/* <tr>
        <td className = "showtd">Profile Pic:</td>
        <td className = "showtd" >{user.profile_pic}</td>
      </tr> */}
    <tr>
        <td className = "showtd">Country:</td>
        <td className = "showtd">{user.country}</td>
      </tr>
      <tr>
        <td className = "showtd">Region:</td>
        <td className = "showtd">{user.region}</td>
      </tr>
      <tr>
        <td className = "showtd">City:</td>
        <td className = "showtd">{user.city}</td>
      </tr>
      {/* <tr>
        <td className = "showtd">Referrer:</td>
        <td className = "showtd"> {user.referrer}</td>
      </tr> */}
      <tr>
        <td className = "showtd">Relationship:</td>
        <td className = "showtd">{user.relationship}</td>
      </tr>
      <tr>
        <td className = "showtd">Family:</td>
        <td className = "showtd">{user.family} </td>
      </tr>
    </table>
    <button className="showUpdateBtn" onClick={onUpdate}>Update</button>
    </div>
    
  //   <div className ="showContainer">
  //   <div>Name: {user.name}</div>
  //  <div>last Name:{user.last_name}   </div>
  //  <div>birth date: {user.birth_date}</div>
  //  <div>Gender: {user.gender}</div>
  //  <div>Email: {user.email}</div>
  //  <div>Profile Pic : {user.profile_pic}</div>
  //  <div>Country: {user.country}</div>
  //  <div>Region: {user.region}</div>
  //  <div>City: {user.city}</div>
  //  <div>Refferrer: {user.referrer}</div>
  //  <div>Relationship: {user.relationship}</div>
  //  <div>Family: {user.family} </div>
  //  <button onClick={onUpdate}>Update</button>
  //   </div>
  )
}