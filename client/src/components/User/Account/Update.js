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
    <div  className="updateContainer">
    <form  onSubmit={submitHandler}>
      {(error !== "") ? (<div>{error}</div>) : "" }
     
        <table >
          <tr>
            <td><label className = "updateInput" for = "name">Name</label></td>
            <td><input className="updateInputLabel" type="text"  value={details.name} onChange={event => {setDetails({...details, name:event.target.value})}}/></td>
          </tr><br />
          <tr>
            <td><label className = "updateInput1"> Last name</label> </td>
            <td><input  className="updateInputLabel" type="text"  value={details.last_name} onChange={event => {setDetails({...details, last_name:event.target.value})}}/></td>
          </tr><br />
          <tr>
            <td><label className = "updateInput2"> Date of birth</label></td>
            <td><input className="updateInputLabel" type="date" value={details.birth_date} onChange={event => setDetails({...details, birth_date:event.target.value})}/></td>
          </tr><br />
          <tr>
            <td> <label className = "updateInput3">Gender</label></td>
            <td><input className="updateInputLabel" type="text" value={details.gender} onChange={event => setDetails({...details, gender:event.target.value})}/></td>
          </tr><br />
          <tr>
            <td> <label className = "updateInput4">Country</label></td>
            <td> <input className="updateInputLabel" type="text" value={details.country} onChange={event => setDetails({...details, country:event.target.value})}/></td>
          </tr><br />
          <tr>
            <td><label className = "updateInput5">City</label></td>
            <td> <input className="updateInputLabel" type="text" value={details.city} onChange={event => setDetails({...details, city:event.target.value})}/></td>
          </tr><br />
          <tr>
            <td><label className = "updateInput2" >Relationship</label></td>
            <td><input className="updateInputLabel" type="text" value={details.family} onChange={event => setDetails({...details, family:event.target.value})}/></td>
          </tr><br />
        </table>
      <div style={{ marginTop: 10 }}>
      <button className = "updateBtn" type="submit" value ="Register" >Register&nbsp;&nbsp;<i class="fas fa-check-circle"></i></button>
      </div>
    </form>
    </div>
  );
}