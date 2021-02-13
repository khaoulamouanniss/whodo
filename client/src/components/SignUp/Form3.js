import React,{useState} from "react";

export default function Form3(props) {
  const {details,setDetails, onNext, error} = props;
  


  return (
   <div>
      <div>
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
      <button onClick={onNext}>Next</button>
      <button>Back</button>
   </div>
  )
}