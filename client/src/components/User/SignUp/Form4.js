import React from "react";
import "./SignUp.css";

const signupForm = {
  border: "3px solid rgb(105, 104, 103)",
  width:"50%",
  borderRadius: "30px",
  backgroundColor: "#eceae8!important",
  boxShadow:"0px 0px 10px #000",
  marginTop: "50px",
  marginLeft:"280px",
  height:"400px"
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


export default function Form4(props) {

  const {details,setDetails, error,submitHandler} = props;
  
  
  return (
   <div style={signupContainer}>
      <div style={signupForm}>
      <div style={{ marginTop: 10 }}>
      <label style={signupLabel} > Relationship<br/></label>
        <input style={signupInput} type="text" value={details.relationship} onChange={event => setDetails({...details, relationship:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={signupLabel} >Family<br /></label>
        <input style={signupInput} type="text" value={details.family} onChange={event => setDetails({...details, family:event.target.value})}/>
      </div>
      <button style={nextButton} onClick={submitHandler}> Register</button>
      <button style={cancelButton}>Back</button>
    </div>
    </div>
  )
}