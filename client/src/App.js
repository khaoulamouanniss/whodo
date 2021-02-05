import React, {useState} from "react";
import axios from "axios";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
//import Answer from "./components/Answer";
//import Submit from "./components/Submit";
//import Item from "./components/Item";
//import ListItems from "./components/ListItems";
//import Account from "./components/Account";

export default function App() {

  /*const adminUser = {
    email : "test@test.com",
    password : "test"
  }
*/
 
  const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id:0,
    name: "",
    lastName:"",     
    birthDate: Date(),
    gender:"",
    email: "",
    password: "",
    profilePic : "",
    country: "",
    region: "",
    city: "",
    referrer: "",
    type: "",
    relationship: "",
    family: "" 
  })

  const login = details => {
    axios.post("http://localhost:8001/login",{ email:details.email, password:details.password })
    .then(res =>
      {
       
        if(res.data === "Email does not exist" || res.data === "Password is incorrect") {
            setError ("Informations do not match!");
        } else {
          setError(null);
          setUser(res.data);
          console.log("Logged in");
          console.log(user.email)
        }
      })
  };
  const Logout = () => {
    console.log("Logout");
    setUser({
      id:0,
      name: "",
      lastName:"",     
      birthDate:Date(),
      gender:"",
      email: "",
      password: "",
      profilePic : "",
      country: "",
      region: "",
      city: "",
      referrer: "",
      type: "",
      relationship: "",
      family: "" 
    })
  };

  const signup = details => {
    axios.post("http://localhost:8001/signup",{ 
      name: details.name, 
      lastName: details.lastName, 
      birthDate: details.birthDate, 
      gender:details.gender, 
      email: details.email, 
      password: details.password, 
      profilePic: details.profilePic, 
      country: details.country, 
      region: details.region, 
      city: details.city, 
      referrer: details.referrer, 
      type: details.type, 
      relationship: details.relationship, 
      family: details.family
    })
    .then(res =>
      {
        console.log(res.data)
        if(res.data === "An account with this email exist") {
            setError ("An account with this email exist");
        } else {
          console.log(res.data);
          setError(null);
          setUser(res.data);
          console.log("Signed up");
          console.log(user.email)
        }
      })
  };
  return (
    <div >
      <Navigation />


      {(user.email !== "") ? (<div>
        <h1> Welcome <span>{user.email}</span></h1>
          <button onClick={Logout}>Logout</button>
        </div>
          ) : <div><Login login={login} error={error}/> <SignUp signup={signup} error={error} /></div>}
    </div>
  );
}


