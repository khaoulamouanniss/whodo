import React from "react";
import * as IoIcons from "react-icons/io";
import {IconContext} from 'react-icons/lib'
import "./Form4.css"

export default function Form4(props) {
  
  
  const {details,setDetails, error,onNext, onBack} = props;
 
  
  return ( 
    <div className="form4">
      <div className="form4-form">   
        <div className="form4-welcome">
          Welcome message by kevin
        </div>     
        <div className="form4-data">
        <label className="form4-label" >Gender</label>
        <IconContext.Provider value ={{ size:30}}>
        <div className="form4-input" onChange={event => setDetails({...details, gender:event.target.value})}>
          <label class="container"><IoIcons.IoMdMale></IoIcons.IoMdMale>
            <input type="radio" value="Male" name="gender" /> 
            <span class="checkmark"></span>
          </label>
          <label class="container"><IoIcons.IoMdFemale></IoIcons.IoMdFemale>
            <input type="radio" value="Female" name="gender" /> 
            <span class="checkmark"></span>
          </label>
          <label class="container">Other
            <input type="radio" value="Other" name="gender" /> 
            <span class="checkmark"></span>
          </label>
        </div>
        </IconContext.Provider>
        {/* <input className="form4-input" type="text" value={details.gender} onChange={event => setDetails({...details, gender:event.target.value})}/>   */}
        </div>
        <div className="form4-buttons">
          <button className="form4-button" onClick={onNext}>Next</button>
          <button className="form4-button" onClick={onBack} >Back</button>
        </div>
      </div>      
    </div>
 
   )
}