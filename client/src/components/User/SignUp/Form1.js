  import React from "react";
  //import "./SignUp.css";
  import GoogleLogin from "react-google-login";
  import FacebookLogin from 'react-facebook-login';

  const signupForm1 = {
    marginTop: "150px",
    marginLeft:"400px"
  }

  const signupButton = {
    backgroundColor:"black",
    color: "white",
    padding: "10px 20px",
    margin:" 20px 5",
    cursor: "pointer",
    width: "20%",
    height: "50px",
    marginLeft:"100px",
    borderRadius: "18px",
    outline:"none",
    fontWeight: "bold",
    fontSize:"20px"
  }

    const signuplabel1 = {
      fontWeight: "bold",
      fontSize: "25px",
      marginRight:"50px"
      
    }
    const signuplabel2 = {
      fontWeight: "bold",
      fontSize: "25px",
    
      marginRight:"0px"
    }
    const signuplabel3 = {
      fontWeight: "bold",
      fontSize: "25px", 
      marginRight:"0px"
    }

    const inputEmail1 = {
      borderColor: "rgb(247,137,37)", 
      outline: "none", 
      padding:"13px",
      borderRadius: "25px",
      width: "50%", 
      borderWidth: "3px", 
      fontSize:"20px",
      marginLeft:"10px"
  }

  const inputEmail2 = {
    borderColor: "rgb(247,137,37)", 
    outline: "none", 
    padding:"13px",
    borderRadius: "25px",
    width: "50%", 
    borderWidth: "3px", 
    fontSize:"20px",
    marginLeft:"5px",
    marginLeft:"10px"
  }
  const inputEmail3 = {
    borderColor: "rgb(247,137,37)", 
    outline: "none", 
    padding:"13px",
    borderRadius: "25px",
    width: "50%", 
    borderWidth: "3px", 
    fontSize:"20px",
    marginLeft:"5px"
  }
    
  export default function Form1(props) {
    const {user,details,setDetails, onNext, error,loginGF,onGF, setGf} = props;
    const responseGoogle = (response) => {
    console.log(response)
      // const email= 
      // const name = 
      // const last_name = 
      // const profile_pic = 
    // console.log("in response" ,email,name,last_name,profile_pic);
    
      //loginGF({email, name, last_name, profile_pic})
      //.then((u) => {
        //   if(u.country) {
        //     console.log("u in liginGF", u)
        //   history.push("/")
        // } else {
          
            setDetails({...details, email:response.profileObj.email, name:response.profileObj.givenName,last_name:response.profileObj.familyName,profile_pic:response.profileObj.imageUrl})
          
            setGf(true);
            onGF();
          
        
          //history.push("/signup3")
          
      // }
    //})
      
      
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

    return (
    
      <div style={signupForm1}>
      
        
        {(error !== "") ? (<div>{error}</div>) : "" }
        <div>
          <label style={signuplabel1} htmlFor ="email">Email:</label>
          <input style={inputEmail1} type="email" value={details.email} onChange={event => setDetails({...details, email:event.target.value})}/>
        </div>
        <div style={{ marginTop: 10 }}>
          <label style={signuplabel2}> Password:</label> 
          <input style={inputEmail2}  type="password" value={details.password} onChange={event => setDetails({...details, password:event.target.value})}/>
        </div>
        <div style={{ marginTop: 10 }}>
          <label style={signuplabel3}> Confirm 
          <br />password:</label>
          <input style={inputEmail3}  type="password"/>
        </div>
        <br />
        <button style={signupButton} onClick={onNext}>Next</button>
        <button style={signupButton}>Cancel</button>
        <div  style={{ marginTop: 40, marginLeft:200}}>
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
        
    
    )
  }