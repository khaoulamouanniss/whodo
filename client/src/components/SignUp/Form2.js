import React,{useState} from "react";

export default function Form2(props) {
  const {details,setDetails, onNext, error} = props;
  return (
    <form>
      <div>
        Name<br />
        <input type="text" value={details.name} onChange={event => setDetails({...details, name:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Last name<br />
        <input type="text" value={details.lastName} onChange={event => setDetails({...details, lastName:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Date of birth<br />
        <input type="date" value={details.birthDate} onChange={event => setDetails({...details, birthDate:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        Gender<br />
        <input type="text" value={details.gender} onChange={event => setDetails({...details, gender:event.target.value})}/>
      </div>
      <button onClick={onNext}>Next</button>
      <button>Back</button>
    </form>
  )
}