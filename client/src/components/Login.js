import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
 import "./Login.css";

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
    <div className = "container">
    <form className = "form-login" onSubmit={submitHandler}>
      {/* Login<br /><br /> */}
      {(error !== "") ? (<div>{error}</div>) : "" }
      <div>
        <label for = "email">Email</label><br />
        <input type="email" placeholder= "Enter email" value={details.email} onChange={event => setDetails({...details, email:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label for = "password">Password</label><br />
        <input type="password" placeholder = "Enter password" value={details.password} onChange={event => setDetails({...details, password:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <button className = "login-btn" type="submit" value ="Login">Login</button>
     
      </div>
    </form>
    
    
    </div>
    ) :<Redirect to='/'></Redirect>;
}