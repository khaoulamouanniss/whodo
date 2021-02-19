import React, { useState } from "react";
import "./Form4.css"

export default function Form4(props) {
  
  
  const {details,setDetails, error,submitHandler} = props;
 
  
  return ( 
  
      <div className="form4Container"> 
      <div style={{ marginTop: 10 }}>
      <label className= "signupLabelrel" >Relationship:</label><br /><br /><br />
        <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Single"})}>Single</button>
        <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Never Married"})}>Never Married</button>
        <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Married"})}>Married</button><br /><br /><br />
        <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Living with Partner"})}>Living with Partner</button>
        <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Widow"})}>Widow</button>
        <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Complicated"})}>Complicated</button><br /><br /><br />
       
      </div>
      <div style={{ marginTop: 10 }}>
      <label className = "signupLabelfam">Family:</label><br /><br /><br />
        <button className = "familyBtn" onClick={() => setDetails({...details, family:"I have one sibling"})}>I have one sibling</button>
        <button className = "familyBtn" onClick={() => setDetails({...details, family:"I have children"})}>I have children</button>
        <button className = "familyBtn" onClick={() => setDetails({...details, family:"I have with my parent"})}>I have with my parent</button><br /><br /><br />

      </div>
      <button className="formRegbtn" onClick={submitHandler}> Register</button>
      <button className="formRegbtn">Back</button>
    </div>
 
   )
}