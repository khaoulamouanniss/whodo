import React, {useState} from 'react';

 
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
    <form onSubmit={submitHandler}>
      Sign Up<br /><br />
      {(error !== "") ? (<div>{error}</div>) : "" }
      <div>
        Email<br />
        <input type="email" value={details.email} onChange={event => setDetails({...details, email:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" value={details.password} onChange={event => setDetails({...details, password:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Name<br />
        <input type="text" value={details.name} onChange={event => setDetails({...details, name:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Last name<br />
        <input type="text" value={details.lastName} onChange={event => setDetails({...details, lastName:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Date of birth<br />
        <input type="date" value={details.birthDate} onChange={event => setDetails({...details, birthDate:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Gender<br />
        <input type="text" value={details.gender} onChange={event => setDetails({...details, gender:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Country<br />
        <input type="text" value={details.country} onChange={event => setDetails({...details, country:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Region<br />
        <input type="text" value={details.region} onChange={event => setDetails({...details, region:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        City<br />
        <input type="text" value={details.city} onChange={event => setDetails({...details, city:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Relationship<br />
        <input type="text" value={details.relationship} onChange={event => setDetails({...details, relationship:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Family<br />
        <input type="text" value={details.family} onChange={event => setDetails({...details, family:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <input type="submit" value ="Register"></input>
      </div>
    </form>
  );
}
