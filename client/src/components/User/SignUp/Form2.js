import React from "react";
import "./Form2.css"




export default function Form2(props) {
  const {details,setDetails, onNext, onBack, error} = props;
  return (
    <div className="form2">
      <div className="form2-form">   
        <div className="form2-welcome">
        
          <div style={{color:"rgb(51, 50, 50)", fontSize:"18px", marginTop:"3%"}}>
          Thank you for choosing whodo, please complete your registration so you can use all the functionalities of whodo.
          </div>  
        </div>     
        <div className="form2-data">
          <label className="form2-label" >Name</label><br />
          <input className="form2-input" type="text" value={details.name} onChange={event => setDetails({...details, name:event.target.value})}/>  
        </div>
        <div className="form2-data">
          <label className="form2-label" >Last name</label><br />
          <input className="form2-input" type="text" value={details.last_name} onChange={event => setDetails({...details, last_name:event.target.value})}/>  
        </div>
        <div className="form2-buttons">
        <button className="form2-button" onClick={onBack}><i class="fas fa-angle-double-left"></i>&nbsp;&nbsp;Back</button>
        <button className="form2-button" onClick={onNext}>Next&nbsp;&nbsp;<i class="fas fa-angle-double-right"></i></button>
        </div>
      </div>
    </div>

  )
}