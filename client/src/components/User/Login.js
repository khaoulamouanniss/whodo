import React, {useState} from 'react';
import axios from 'axios';
import {Redirect,useHistory} from 'react-router-dom';
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import * as AiIcons from "react-icons/ai";
import "./Login.css";


export default function Login(props) {

  let history=useHistory();
  const{change,setChange,setUser,setError,loginGF, error,user} = props;

  const[loggedIn,setLoggetIn] = useState(false)
  const [details, setDetails] = useState({})

  const login = details => {
    
    axios.post('http://localhost:8001/login',{ email:details.email, password:details.password })
    .then(res =>
      {
       if(res.data === 'Email does not exist' || res.data === 'Password is incorrect') {
            setError ('Informations do not match!');
        } else {
          console.log('details in function login', details)
          console.log('login res data', res.data)
          setError(null);
          setUser(res.data);
          setChange(!change);
          console.log('Logged in' ,user);
          history.push("/")
         
        }
      })
  };
  const submitHandler = event => {
    event.preventDefault();
    login(details)
    };

  const responseGoogle = (response) => {
    console.log(response)
    //setDetails({...details, email:response.profileObj.email, name:response.profileObj.givenName,last_name:response.profileObj.familyName,profile_pic:response.profileObj.imageUrl})
    loginGF({email:response.profileObj.email, name:response.profileObj.givenName,last_name:response.profileObj.familyName,profile_pic:response.profileObj.imageUrl}) 
    history.push("/");
    setLoggetIn(true); 
  }
  const responseFacebook = (response) => {
    console.log("facebook response",response);
    let name = response.name.split(" ");
    let lastName ="";
    for(let i = 1; i < name.length; i++) {
      lastName += name[i];
    }
    loginGF({email:response.email, name:name[0],last_name:lastName,profile_pic:response.picture}) 
    setLoggetIn(true); 
    history.push("/");
  }
    const componentClicked = (data) => {
      //loginF();
    }
    const failureCnx = (error) => {
      console.log(error)
    }
  return !loggedIn ?(
    <div className="login">
      <form className="login-form" onSubmit={submitHandler}>
        <div className="login-welcome">
          Welcome message by kevin
        </div>
        {(error !== "") ? (<div className="login-error">{error}</div>) : "" }
        <div className="login-data">
          <label className="login-label" for = "email">Email</label><br />
          <input className="login-input" type="email" placeholder= "" value={details.email} onChange={event => setDetails({...details, email:event.target.value})}/>  
        </div>
        <div className="login-data">
          <label className="login-label" for = "password">Password</label>
          <input className="login-input" type="password" placeholder = "" value={details.password} onChange={event => setDetails({...details, password:event.target.value})}/>
        </div>
        <div className="login-buttons">
          <button className="login-button" value ="Cancel" onClick={()=>history.push("/")}><i class="fas fa-times"></i>&nbsp;&nbsp;Cancel</button>
          <button className="login-button" type="submit" value ="Login">Login&nbsp;&nbsp;<i class="fas fa-check"></i></button>
          
        </div>
      </form>
      <div className="login-GF-buttons">
        <div className="login-GF">
          <GoogleLogin
            clientId="1072369902227-qfuup9fprmc2qusd4jemg4o7fcc6iljv.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={failureCnx}
            cookiePolicy={'single_host_origin'}
            //isSignedIn={true}
          />
        </div>
        <div className="login-GF">
          <FacebookLogin
            appId="179472363976068"
            autoLoad={false}
            fields="name,email,picture"
            onClick={componentClicked}
            onFailure={failureCnx}
            callback={responseFacebook}
            textButton="Login"
            size="small"
            icon="fa-facebook"
            />
          </div>
      </div>
    </div>
    ) : <Redirect to='/'></Redirect>;
}