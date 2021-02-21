import React from "react";
import "./Form6.css"

export default function Form6(props) {
  
  
  const {details,setDetails,submitHandler,onBack} = props;
 
  
  return ( 
  
    <div className="form6">
    <div className="form6-form">   
      <div className="form6-welcome">
        Welcome message by kevin
      </div>     
      <div className="form6-data">
        <label className="form6-label" >Relationship</label><br />
        <div className="relation-buttons1">
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Single"})}>Single</button>
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Married"})}>Married</button><br /><br /><br />
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Divorced"})}>Divorced</button><br /><br /><br />
        </div>
        <div className="relation-buttons1">  
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Living with Partner"})}>Living with Partner</button>
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Widowed"})}>Widow</button>
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Complicated"})}>Complicated</button><br /><br /><br />
        </div> 
      </div>
      <div className="form6-buttons">
        <button className="form6-button" onClick={submitHandler}> Register</button>
        <button className="form6-button" onClick={onBack} >Back</button>
      </div>
    </div>      
  </div>
  )
}