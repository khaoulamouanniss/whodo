import React from "react";
import "./SignUp.css";

const signupForm = {
  border: "3px solid rgb(105, 104, 103)",
  width:"60%",
  borderRadius: "30px",
  backgroundColor: "#eceae8!important",
  boxShadow:"0px 0px 10px #000",
  marginTop: "50px",
  marginLeft:"280px",
  height:"500px"
 }
 const signupContainer = {
  padding: "auto"
  }

  const signupInput = {
    width: "50%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    marginLeft:"150px",
    borderRadius: "15px",
    outline: "none"
  }
  const signupLabel = {
    
    marginLeft : "30px",
    fontWeight: "bold",
    fontSize: "20px",
   
   
  }

  const nextButton = {
    backgroundColor:"rgba(26, 27, 29, 0.753)",
    color: "white",
    padding: "10px 14px",
    margin:" 8px 0",
    borderColor: "rgba(152, 153, 155, 0.753)",
    cursor: "pointer",
    width: "20%",
    height: "50px",
    marginLeft:"260px",
    borderRadius: "12px",
    outline:"none",
    fontWeight: "bold",
    fontSize:"20px"
  }
  const cancelButton = {
    backgroundColor:"rgba(26, 27, 29, 0.753)",
    color: "white",
    padding: "10px 14px",
    margin:" 8px 0",
    borderColor: "rgba(152, 153, 155, 0.753)",
    cursor: "pointer",
    width: "20%",
    height: "50px",
    marginLeft:"50px",
    borderRadius: "12px",
    outline:"none",
    fontWeight: "bold",
    fontSize:"20px",
    float:"right",
    marginTop:"8px",
    marginRight:"80px"
  }

export default function Form2(props) {
  const {details,setDetails, onNext, error} = props;
  return (
    <div style ={signupContainer}>
    <div style={signupForm}>
      <div style={{marginLeft: 10}}>
       <label style={signupLabel}>  Name<br /></label>
        <input style={signupInput} type="text" value={details.name} onChange={event => setDetails({...details, name:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={signupLabel}> Last name<br /></label>
        <input style={signupInput} type="text" value={details.last_name} onChange={event => setDetails({...details, last_name:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={signupLabel}>  Date of birth<br /></label>
        <input style={signupInput} type="date" value={details.birth_date} onChange={event => setDetails({...details, birth_date:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={signupLabel}> Gender<br /></label>
        <input style={signupInput} type="text" value={details.gender} onChange={event => setDetails({...details, gender:event.target.value})}/>
      </div>
      <button style={nextButton} onClick={onNext}>Next</button>
      <button style={cancelButton}>Back</button>
   </div>
   </div>
  )
}