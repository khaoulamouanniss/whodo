import React, {useState} from "react";
import axios from "axios";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Answer from "./components/Answer";
import Submit from "./components/Submit";
import Item from "./components/Item";
import ListItems from "./components/ListItems";
import Account from "./components/Account";

export default function App() {

  /*const adminUser = {
    email : "test@test.com",
    password : "test"
  }
*/
  const [email,setEmail] = useState("");
  const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);

  const login = details => {
    axios.post("http://localhost:8001/login",{ email:details.email, password:details.password })
    .then(res =>
      {
        console.log(res.data)
        if(res.data === "Email does not exist" || res.data === "Password is incorrect") {
            setError ("Informations do not match!");
        } else {
          console.log(res.data);
          setError(null);
          setEmail(res.data.email);
          console.log("Logged in");
        }
      })
  };
  const Logout = () => {
    console.log("Logout");
    setEmail("")

  };
  return (
    <div >
      <Navigation />

      {(email !== "") ? (<div>
        <h1> Welcome <span>{email}</span></h1>
          <button onClick={Logout}>Logout</button>
        </div>
          ) : <Login login={login} error={error}/>}
      {/*<Login />*/}
     
    </div>
  );
}


