import React from "react";
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
//import "./SignUp.css";

const signupForm2 = {
  marginTop: "150px",
  marginLeft:"400px"
 }
const form2Btn = {
  backgroundColor:"black",
  color: "white",
  padding: "10px 14px",
  cursor: "pointer",
  width: "20%",
  height: "50px",
  marginLeft:"70px",
  borderRadius: "18px",
  outline:"none",
  fontWeight: "bold",
  fontSize:"20px"
}
   const signuplabel4 = {
    fontWeight: "bold",
    fontSize: "25px",
    marginRight:"110px"
  }
  const signuplabel5 = {
    fontWeight: "bold",
    fontSize: "25px",
   
    marginRight:"20px"
  }
  
  const inputEmail4 = {
    borderColor: "rgb(247,137,37)", 
    outline: "none", 
    padding:"13px",
    borderRadius: "25px",
    width: "50%", 
    borderWidth: "3px", 
    fontSize:"20px",
    marginLeft:"-33px"
}
const inputEmail5 = {
  borderColor: "rgb(247,137,37)", 
  outline: "none", 
  padding:"13px",
  borderRadius: "25px",
  width: "50%", 
  borderWidth: "3px", 
  fontSize:"20px",
  marginLeft:"5px"
}

export default function Form2(props) {
  const {details,setDetails, onNext, error} = props;
  return (
    <div style={signupForm2}>
      <div style={{marginLeft: 10}}>
       <label style={signuplabel4}>Name:</label>
        <input style={inputEmail4} type="text" value={details.name} onChange={event => setDetails({...details, name:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={signuplabel5}>Last Name:</label>
        <input style={inputEmail5} type="text" value={details.last_name} onChange={event => setDetails({...details, last_name:event.target.value})}/>
      </div>
      {/* <div style={{ marginTop: 10 }}>
      <label style={signuplabel6}>Date of birth:</label>
        <input style={inputEmail5} type="date" value={details.birth_date} onChange={event => setDetails({...details, birth_date:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={signupLabel7}>Gender:</label>
        <input style={inputEmail7} type="text" value={details.gender} onChange={event => setDetails({...details, gender:event.target.value})}/>
      </div> */}
      <br />
      <button style={form2Btn} onClick={onNext}>Next</button>
      <button style={form2Btn}>Back</button>
   </div>

  )
}