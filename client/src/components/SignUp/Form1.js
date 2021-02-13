import React,{useState} from "react";

export default function Form1(props) {
  const {details,setDetails, onNext, error} = props;
  return (
    <div>
     
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
        Confirm password<br />
        <input type="password" value={details.password} onChange={event => setDetails({...details, password:event.target.value})}/>
      </div>
      <button onClick={onNext}>Next</button>
      <button>Cancel</button>
    

    </div>
  )
}