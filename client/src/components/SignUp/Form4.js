import React,{useState} from "react";

export default function Form4(props) {
  const {details,setDetails, error,submitHandler} = props;
  
  
  return (
   <div>
      <div>
      Relationship<br/>
        <input type="text" value={details.relationship} onChange={event => setDetails({...details, relationship:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Family<br />
        <input type="text" value={details.family} onChange={event => setDetails({...details, family:event.target.value})}/>
      </div>
      <button  onClick={submitHandler}> Register</button>
      <button>Back</button>
    </div>
  )
}