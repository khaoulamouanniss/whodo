import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';


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
  const{login,loginGF, error} = props;

  const[loggedIn,setLoggetIn] = useState(false)
  const [details, setDetails] = useState({})

  const submitHandler = event => {
    event.preventDefault();
    login(details)   
    setLoggetIn(true);
  };

  const responseGoogle = (response) => {
    console.log(response)
    //setDetails({...details, email:response.profileObj.email, name:response.profileObj.givenName,last_name:response.profileObj.familyName,profile_pic:response.profileObj.imageUrl})
    loginGF({email:response.profileObj.email, name:response.profileObj.givenName,last_name:response.profileObj.familyName,profile_pic:response.profileObj.imageUrl}) 
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
  }
    const componentClicked = (data) => {
      //loginF();
    }
    const failureCnx = (error) => {
      console.log(error)
    }
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
    <div>
    <GoogleLogin
          clientId="1072369902227-qfuup9fprmc2qusd4jemg4o7fcc6iljv.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={failureCnx}
          cookiePolicy={'single_host_origin'}
          //isSignedIn={true}
        />
        
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
    ) :<Redirect to='/'></Redirect>;
}