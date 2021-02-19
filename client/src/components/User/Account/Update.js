import React, {useState} from 'react';
import "./Update.css"

export default function Update(props) {
  const{user, update, error, onUpdate} = props;
  const [details, setDetails] = useState(user)
  const submitHandler = event => {
    event.preventDefault();
    update(details, user.email)
     onUpdate()
 };
  return (
    <form className="updateContainer"onSubmit={submitHandler}>
      {(error !== "") ? (<div>{error}</div>) : "" }
      <div style={{ marginTop: 10 }}>
        <label className = "updateInput" for = "name">Name</label>
        <input  type="text"  value={details.name} onChange={event => {setDetails({...details, name:event.target.value})}}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label className = "updateInput1"> Last name</label>
        <input type="text" value={details.last_name} onChange={event => setDetails({...details, last_name:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label className = "updateInput2"> Date of birth</label>
        <input  type="date" value={details.birth_date.includes('T') ? details.birth_date.slice(0, details.birth_date.indexOf('T')) : details.birth_date} onChange={event => setDetails({...details, birth_date:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label className = "updateInput3">Gender</label>
        <input  type="text" value={details.gender} onChange={event => setDetails({...details, gender:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label className = "updateInput4">Country</label>
        <input  type="text" value={details.country} onChange={event => setDetails({...details, country:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label className = "updateInput3">Region</label>
        <input type="text" value={details.region} onChange={event => setDetails({...details, region:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label className = "updateInput5">City</label>
        <input type="text" value={details.city} onChange={event => setDetails({...details, city:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label className = "updateInput2" >Relationship</label>
        <input  type="text" value={details.relationship} onChange={event => setDetails({...details, relationship:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label className = "updateInput" >Family</label>
        <input type="text" value={details.family} onChange={event => setDetails({...details, family:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <button className = "updateBtn" type="submit" value ="Register" >Register  </button>
      </div>
    </form>
  );
}