  import React from "react";
  import {useHistory} from "react-router-dom"
  import "./Form1.css";
  import GoogleLogin from "react-google-login";
  import FacebookLogin from 'react-facebook-login';

  
  export default function Form1(props) {
    const {user,details,setDetails, onNext, error,loginGF,onGF, setGf} = props;
    let history = useHistory();
    const responseGoogle = (response) => {
    console.log(response)
    setDetails({...details, email:response.profileObj.email, name:response.profileObj.givenName,last_name:response.profileObj.familyName,profile_pic:response.profileObj.imageUrl})
    setGf(true);
    onGF();
  
  }
  const responseFacebook = (response) => {
    console.log("facebook response",response);
    let name = response.name.split(" ");
    let lastName ="";
    for(let i = 1; i < name.length; i++) {
      lastName += name[i];
    }
    setDetails({...details, email:response.email, name:name[0],last_name:lastName,profile_pic:response.picture})     
          setGf(true);
            onGF();
            }
    const componentClicked = (data) => {
      //loginF();
    }
    const failureCnx = (error) => {
      console.log(error)
    }
    const onCancel = () => {
      console.log("I am here")
      history.push("/");
    }

  return (
    <div className="form1">
      <div className="form1-form">   
        <div className="form1-welcome">
          Welcome message by kevin
        </div>     
        {(error !== "") ? (<div className="form1-error">{error}</div>) : "" }
        <div className="form1-data">
          <label className="form1-label" for = "email">Email</label><br />
          <input className="form1-input" type="email" placeholder= "" value={details.email} onChange={event => setDetails({...details, email:event.target.value})}/>  
        </div>
        <div className="form1-data">
          <label className="form1-label" for = "password">Password</label>
          <input className="form1-input" type="password" placeholder = "" value={details.password} onChange={event => setDetails({...details, password:event.target.value})}/>
        </div>
        <div className="form1-data">
          <label className="form1-label" for = "password">Confirm password</label>
          <input className="form1-input" type="password" placeholder = ""/>
        </div>
        <div className="form1-buttons">
          <button className="form1-button" onClick={onCancel}><i class="fas fa-angle-double-left"></i>&nbsp;&nbsp;Cancel</button>
          <button className="form1-button" onClick={onNext}>Next&nbsp;&nbsp;<i class="fas fa-angle-double-right"></i></button>
          
        </div>
      </div>
      <div className="form1-GF-buttons">
        <div className="form1-GF">
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
    
    )
  }