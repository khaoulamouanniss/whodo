import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
 import "./Login.css";

 const loginForm = {
  border: "3px solid rgb(105, 104, 103)",
  width:"50%",
  borderRadius: "30px",
  backgroundColor: "#eceae8!important",
  boxShadow:"0px 0px 10px #000",
  marginTop: "50px",
  marginLeft:"340px"
 }

/* Add padding to containers */
const loginContainer = {
padding: "auto"
}
/* Full-width inputs */
const loginInput = {
  width: "50%",
  padding: "12px 20px",
  margin: "8px 0",
  display: "inline-block",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  marginLeft:"150px",
  borderRadius: "15px",
  outline: "none"
}
/* Set a style for all buttons */
const loginButton = {
  backgroundColor:"rgba(26, 27, 29, 0.753)",
  color: "white",
  padding: "10px 14px",
  margin:" 8px 0",
  borderColor: "rgba(152, 153, 155, 0.753)",
  cursor: "pointer",
  width: "20%",
  height: "50px",
  marginLeft:"210px",
  borderRadius: "12px",
  outline:"none",
  fontWeight: "bold",
  fontSize:"20px"
}
const cancelButton = {
  backgroundColor:"rgba(26, 27, 29, 0.753)",
  color: "white",
  padding: "10px 14px",
  margin:" 8px 0",
  borderColor: "rgba(152, 153, 155, 0.753)",
  cursor: "pointer",
  width: "20%",
  height: "50px",
  marginLeft:"50px",
  borderRadius: "12px",
  outline:"none",
  fontWeight: "bold",
  fontSize:"20px",
  float:"right",
  marginTop:"8px",
  marginRight:"60px"
}
const loginLabel = {
  marginLeft : "30px",
  fontWeight: "bold",
  fontSize: "20px",
 
}

export default function Login(props) {
  const{login, error} = props;

  const[loggedIn,setLoggetIn] = useState(false)
  const [details, setDetails] = useState({email:"", password:""})

  const submitHandler = event => {
    event.preventDefault();
    login(details);
    setLoggetIn(true);

  };

  return !loggedIn ? (
    <div style={loginContainer}>
    <form style ={loginForm} onSubmit={submitHandler}>
      {/* Login<br /><br /> */}
      {(error !== "") ? (<div>{error}</div>) : "" }
      <div>
        <label style={loginLabel} for = "email">Email</label><br />
        <input style={loginInput} type="email" placeholder= "Enter email" value={details.email} onChange={event => setDetails({...details, email:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={loginLabel} for = "password">Password</label><br />
        <input style={loginInput} type="password" placeholder = "Enter password" value={details.password} onChange={event => setDetails({...details, password:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <button style={loginButton} type="submit" value ="Login">Login</button>
      <button style={cancelButton}  value ="Cancel">Cancel</button>
     
      </div>
    </form>
    
    
    </div>
    ) :<Redirect to='/'></Redirect>;
}