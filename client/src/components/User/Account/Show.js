import React,{useState, useRef} from "react";
//import axios from "axios"
import pic from "./default-profile-pic.png"
import { BsUpload } from "react-icons/bs";
import "./Show.css";
export default function Show(props) {
  const {user,onUpdate} =props;
  // const [previewImage,setPreviewImage] = useState("")
  // const wrapperRef = useRef(null);
  // const validateUpload = e => {
  //   return (
  //   e.target.files[0].type ==="image/png" ||
  //   e.target.files[0].type ==="image/jpg"||
  //   e.target.files[0].type ==="image/jpeg");
  // }
  // const upload = e => {
  //   if (e.target.files[0].size <= 2000000) {
  //     let file = e.target.files[0];
  //     let reader = new FileReader();
  //     reader.onload = function(e) {
  //       setPreviewImage(e.target.result);
  //       uploadAsync(file);
  //     }
  //     reader.readAsDataURL(file);
  //   } else {
  //     e.target.value = "";
  //     alert("Please upload less than 2MB")
  //   }
  // }
  // const uploadAsync = async profile_file => {
  //   try{
  //     let formData = new FormData();
  //     formData.append("profile_pic",profile_file);
  //     console.log(formData);
  //     console.log("profile_file",profile_file)
  //     let res = await axios.post("http://localhost:8001/uploadpic", {formData,email:user.email});
  //     alert(res)
  //   }
  //   catch(e) {alert(e)}
  // }


  let profile_pic = user.profile_pic !== "" || user.profile_pic !== null ? user.profile_pic : pic;
  return (
    <div className ="showContainer"> 

      {/* <div onClick={() => {wrapperRef.current.click()}}>
        <img src={user.profile_pic || ""}></img>
      
      <input 
      type="file"
      id="profile_pic"
      onChange={e => {
        let files = e.target.files;
        if (files.length === 1 && validateUpload(e)) {
          upload(e);
        } else {
          e.target.value = "";
          alert("please add image only");
        }
      }}
      ref={wrapperRef}
      accpet="image/gif, image/jpeg, image/jpg, image/png"></input></div> */}
      <div className="show-img">
      <img src={profile_pic}></img>
      </div>
      <table  className="showtable">
      <tr>
        <td className = "showtd">  Name</td>
        <td className = "showtd">{user.name}</td>
      </tr>
      <tr>
        <td className = "showtd">Last Name</td>
        <td className = "showtd">{user.last_name}</td>
      </tr>
      <tr>
        <td className = "showtd"> BirthDate</td>
        <td className = "showtd">{user.birth_date}</td>
      </tr>
      <tr>
        <td className = "showtd">Gender</td>
        <td className = "showtd">{user.gender}</td>
      </tr>
      <tr>
        <td className = "showtd">Email</td>
        <td className = "showtd">{user.email}</td>
      </tr>
      {/* <tr>
        <td className = "showtd">Profile Pic:</td>
        <td className = "showtd" >{user.profile_pic}</td>
      </tr> */}
    <tr>
        <td className = "showtd">Country</td>
        <td className = "showtd">{user.country}</td>
      </tr>
      <tr>
        <td className = "showtd">Region</td>
        <td className = "showtd">{user.region}</td>
      </tr>
      <tr>
        <td className = "showtd">City</td>
        <td className = "showtd">{user.city}</td>
      </tr>
      {/* <tr>
        <td className = "showtd">Referrer:</td>
        <td className = "showtd"> {user.referrer}</td>
      </tr> */}
      <tr>
        <td className = "showtd">Relationship</td>
        <td className = "showtd">{user.relationship}</td>
      </tr>
    </table>
    <div className="show-edit"><i onClick={onUpdate} class="fas fa-edit"></i></div>
    
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