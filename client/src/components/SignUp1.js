import React, {useState} from 'react';
import "./SignUp.css";

export default function SignUp(props) {
  const{signup, error} = props;

  const [details, setDetails] = useState({
    name: "",
    lastName:"",     
    birthDate:"",
    gender:"",
    email: "",
    password: "",
    profilePic : "",
    country: "",
    region: "",
    city: "",
    referrer: "referrer",
    type: "normal",
    relationship: "",
    family: "" 
  });

  const submitHandler = event => {
    event.preventDefault();
    signup(details);
  };
  
  return (
    <form className = "form-signup" onSubmit={submitHandler}>
      Sign Up<br /><br />
      {(error !== "") ? (<div>{error}</div>) : "" }
      {/* <div>
        Email<br />
        <input type="email" value={details.email} onChange={event => setDetails({...details, email:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" value={details.password} onChange={event => setDetails({...details, password:event.target.value})}/>
      </div> */}
      <div style={{ marginTop: 10 }}>
        <label for = "name">Name</label><br />
        <input type="text" value={details.name} onChange={event => setDetails({...details, name:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label> Last name</label><br />
        <input type="text" value={details.lastName} onChange={event => setDetails({...details, lastName:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label> Date of birth</label><br />
        <input type="date" value={details.birthDate} onChange={event => setDetails({...details, birthDate:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Gender</label><br />
        <input type="text" value={details.gender} onChange={event => setDetails({...details, gender:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Country</label><br />
        <input type="text" value={details.country} onChange={event => setDetails({...details, country:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Region</label><br />
        <input type="text" value={details.region} onChange={event => setDetails({...details, region:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>City</label><br />
        <input type="text" value={details.city} onChange={event => setDetails({...details, city:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Relationship</label><br />
        <input type="text" value={details.relationship} onChange={event => setDetails({...details, relationship:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Family</label><br />
        <input type="text" value={details.family} onChange={event => setDetails({...details, family:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <button type="submit" value ="Register" className = "signup-button">Register</button>
      </div>
    </form>
  );
}