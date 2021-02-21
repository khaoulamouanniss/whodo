import React from "react";
import "./Form3.css";
export default function Form3(props) {
  const {details,setDetails, onNext, onBack, error} = props;
  
  
  return (
    <div className="form3">
      <div className="form3-form">   
        <div className="form3-welcome">
          Welcome message by kevin
        </div>     
        <div className="form3-data">
          <label className="form3-label" >Date of birth</label><br />
          <input className="form3-input" type="date" value={details.birth_date} onChange={event => setDetails({...details, birth_date:event.target.value})}/>  
        </div>
        <div className="form3-buttons">
          <button className="form3-button" onClick={onNext}>Next</button>
          <button className="form3-button" onClick={onBack} >Back</button>
        </div>
      </div>
   </div>
  )
}