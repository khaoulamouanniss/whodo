import React,{useState} from "react";
import "./Form3.css";


export default function Form3(props) {
  const {details,setDetails, onNext, onBack, error} = props;

  return (
    <div className="form3">
      <div className="form3-form">   
        <div className="form3-welcome">
        
        Welcome to Whodo
          <div style={{color:"rgb(51, 50, 50)", fontSize:"18px", marginTop:"3%"}}>
          You must be 18+ to use Whodo.
           </div>  
           <div style={{color:"rgb(51, 50, 50)", fontSize:"18px", marginTop:"3%"}}>
          Please enter your birthdate.
           </div> 
        </div>     
        <div className="form3-data">
          {/* <label className="form3-label" >Date of birth</label><br /> */}
          <input className="form3-input" type="date" value={details.birth_date} onChange={event => setDetails({...details, birth_date:event.target.value})}/>  
        </div>
        <div className="form3-buttons">
        <button className="form3-button" onClick={onBack}><i class="fas fa-angle-double-left"></i>&nbsp;&nbsp;Back</button>
        <button className="form3-button" onClick={onNext}>Next&nbsp;&nbsp;<i class="fas fa-angle-double-right"></i></button>
        </div>
      </div>
   </div>
  )
}