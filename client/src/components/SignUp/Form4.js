import React,{useState} from "react";

export default function Form2(props) {
  const {details,setDetails, onNext, error} = props;
  return (
    <form>
      <div>
      Relationship<br />
        <input type="text" value={details.relationship} onChange={event => setDetails({...details, relationship:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Family<br />
        <input type="text" value={details.family} onChange={event => setDetails({...details, family:event.target.value})}/>
      </div>
      <button onClick={onNext}>Register</button>
      <button>Back</button>
    </form>
  )
}