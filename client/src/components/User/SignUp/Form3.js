import React from "react";
//import "./SignUp.css";
export default function Form3(props) {
  const {details,setDetails, onNext, error} = props;
  
  const signupForm3 = {
    marginTop: "150px",
    marginLeft:"400px"
   }
  
  const signupButton = {
    backgroundColor:"black",
    color: "white",
    padding: "10px 9px",
    cursor: "pointer",
    width: "20%",
    height: "50px",
    marginLeft:"60px",
    borderRadius: "18px",
    outline:"none",
    fontWeight: "bold",
    fontSize:"20px"
  }
  
     const signupLabel9 = {
    fontWeight: "bold",
    fontSize: "25px",
    marginRight:"30px"
    }
    const signuplabel10 = {
      fontWeight: "bold",
    fontSize: "25px",
    marginRight:"45px"
    }
    const signuplabel11 = {
      fontWeight: "bold",
    fontSize: "25px",
    marginRight:"80px"
    }
  
    const inputEmail7 = {
      borderColor: "rgb(247,137,37)", 
      outline: "none", 
      padding:"13px",
      borderRadius: "25px",
      width: "50%", 
      borderWidth: "3px", 
      fontSize:"20px",
      marginLeft:"5px"
  }
  
  const inputEmail8 = {
    borderColor: "rgb(247,137,37)", 
    outline: "none", 
    padding:"13px",
    borderRadius: "25px",
    width: "50%", 
    borderWidth: "3px", 
    fontSize:"20px",
    marginLeft:"5px"
  }
  const inputEmail9 = {
    borderColor: "rgb(247,137,37)", 
    outline: "none", 
    padding:"13px",
    borderRadius: "25px",
    width: "50%", 
    borderWidth: "3px",  
    fontSize:"20px",
    marginLeft:"5px"
  }
  const signuplabel6 = {
    fontWeight: "bold",
    fontSize: "25px",
    marginRight:"0px"
  }
  const signupLabel7 = {
    fontWeight: "bold",
    fontSize: "25px",
    marginRight:"65px"
  }
  const inputEmail5= {
    borderColor: "rgb(247,137,37)", 
      outline: "none", 
      padding:"13px",
      borderRadius: "25px",
      width: "50%", 
      borderWidth: "3px",
    fontSize:"20px",
    marginLeft:"5px"
  }
  
  const inputEmail6= {
    borderColor: "rgb(247,137,37)", 
    outline: "none", 
    padding:"13px",
    borderRadius: "25px",
    width: "50%", 
    borderWidth: "3px",
    fontSize:"20px",
    marginLeft:"5px"
  }
  return (
   
      <div style={signupForm3}>
        <div style={{ marginTop: 10 }}>
      <label style={signuplabel6}>Date of birth:</label>
        <input style={inputEmail5} type="date" value={details.birth_date} onChange={event => setDetails({...details, birth_date:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={signupLabel7}>Gender:</label>
        <input style={inputEmail6} type="text" value={details.gender} onChange={event => setDetails({...details, gender:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
        <label style={signupLabel9} >Country:</label>
        <input style={inputEmail7} type="text" value={details.country} onChange={event => setDetails({...details, country:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={signuplabel10} >Region:</label>
        <input style={inputEmail8} type="text" value={details.region} onChange={event => setDetails({...details, region:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={signuplabel11} >City:</label>
        <input style={inputEmail9} type="text" value={details.city} onChange={event => setDetails({...details, city:event.target.value})}/>
      </div>
      <br />
      <button style={signupButton} onClick={onNext}>Next</button>
      <button style={signupButton}>Back</button>
   </div>
  )
}