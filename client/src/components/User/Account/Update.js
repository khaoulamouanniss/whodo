import React, {useState} from 'react';


export default function Update(props) {
  const{user, signup, error} = props;
  const [details, setDetails] = useState(user);
 
  //setDetails(user)

  const submitHandler = event => {
    event.preventDefault();
    signup(details);
  };
  
  return (
    <form className = "form-signup" onSubmit={submitHandler}>
      
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
        <input type="text"  value={details.name} onChange={event => {setDetails({...details, name:event.target.value})}}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label> Last name</label><br />
        <input type="text" value={details.last_name} onChange={event => setDetails({...details, last_name:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label> Date of birth</label><br />
        <input type="date" value={details.birth_date.includes('T') ? details.birth_date.slice(0, details.birth_date.indexOf('T')) : details.birth_date} onChange={event => setDetails({...details, birth_date:event.target.value})}/>
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
