import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
 

const loginForm = {
  marginTop: "150px",
  marginLeft:"475px"
}
const loginButton = {
  backgroundColor:"black",
  color: "white",
  padding: "10px 14px",
  margin:" 20px 5",
  cursor: "pointer",
  width: "20%",
  height: "50px",
  marginLeft:"40px",
  borderRadius: "18px",
  outline:"none",
  fontWeight: "bold",
  fontSize:"20px"
}

const label1 = {
  fontWeight: "bold",
  fontSize: "25px",
  marginTop:"60px",
  marginLeft:"110px"
  

}

const label2 = {

  fontWeight: "bold",
  fontSize: "25px",
  marginLeft:"100px"
 
}

const inputEmail = {
  borderColor: "rgb(247,137,37)", 
  outline: "none", 
  padding:"15px",
  borderRadius: "15px",
  width: "50%", 
  borderWidth: "3px", 
  fontSize:"20px"

}

const inputPassword = {
  borderColor:  "rgb(247,137,37)", 
  outline: "none", 
  padding:"15px",
  borderRadius: "15px",
  marginLeft: "0px",
  width: "50%",
  borderWidth: "3px",
  fontSize:"20px"
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
    <div>
    <form style = {loginForm} onSubmit={submitHandler}>
      {/* Login<br /><br /> */}
      {(error !== "") ? (<div>{error}</div>) : "" }
      <div >
        <label style = {label1} for = "email">Email</label><br />
        <input style = {inputEmail} type="email" placeholder= "Enter email" value={details.email} onChange={event => setDetails({...details, email:event.target.value})}/> 
       
      </div>
      <div>
      <br />
      <label style = {label2} for = "password">Password</label><br />
        <input style = {inputPassword} type="password" placeholder = "Enter password" value={details.password} onChange={event => setDetails({...details, password:event.target.value})}/>
      </div>
      <div>
        <br />
      <button style = {loginButton} type="submit" value ="Login">Login</button>
      <button style = {loginButton} value ="Cancel">Cancel</button>
     
      </div>
    </form>
    
    
    </div>
    ) :<Redirect to='/'></Redirect>;
}