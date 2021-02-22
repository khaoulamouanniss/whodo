import React,{useState} from "react";
import Select from 'react-select';
import "./Form6.css"

export default function Form6(props) {
  
  const styles = {
    control: (base) => ({
      ...base,
      border: '2px solid rgb(247,137,37)',
      boxShadow: 'none',
      width:'450px',
      borderRadius:'15px',
      '&:hover': {
          border: '1px solid black',
      }
  })
    
}
const colourStyles = {
  control: (base) => ({
    ...base,
    border: '2px solid rgb(247,137,37)',
    boxShadow: 'none',
    width:'450px',
    borderRadius:'15px',
    '&:hover': {
        border: '1px solid rgb(247,137,37)',
    }
}),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    console.log({ data, isDisabled, isFocused, isSelected });
    return {
      ...styles,
      backgroundColor: isFocused ? "rgba(180, 177, 177, 0.16)" : null,
      backgroundColor: isSelected ? "rgb(241, 184, 130)" : null,
      color: "#333333"
    };
  }
};
  const {details,setDetails,submitHandler,onBack} = props;
  const [selected,setSelected] = useState("");
  const options = [
    {label: "Single", value: "Single"},
    {label: "Married", value: "Married"},
    {label: "Divorced", value: "Divorced"},
    {label: "Living with Partner", value: "Living with Partner"},
    {label: "Widowed", value: "Widowed"},
    {label: "It's complicated", value: "It's complicated"}
  ]
 
  const handleChange = (selectedOption) => {
    setSelected(selectedOption)
    setDetails({...details, relationship:selectedOption})
  }
  
  return ( 
  
    <div className="form6">
    <div className="form6-form">   
      <div className="form6-welcome">
        Welcome message by kevin
      </div>     
      <div className="form6-data">
        <label className="form6-label" >Relationship</label><br />
        <div className="form6-input">
            <Select 
            value={selected}
            onChange={handleChange}
            options={options}
            placeholder={"How do define your relationship?"}
            styles={colourStyles}
            />
          </div>
        
        {/* <div className="relation-buttons1">
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Single"})}>Single</button>
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Married"})}>Married</button><br /><br /><br />
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Divorced"})}>Divorced</button><br /><br /><br />
        </div>
        <div className="relation-buttons1">  
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Living with Partner"})}>Living with Partner</button>
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Widowed"})}>Widow</button>
          <button className="relationshipBtn" onClick={() => setDetails({...details, relationship:"Complicated"})}>Complicated</button><br /><br /><br />
        </div>  */}
      </div>
      <div className="form6-buttons">
        <button className="form6-button" onClick={onBack}><i class="fas fa-angle-double-left"></i>&nbsp;&nbsp;Back</button>
        <button className="form6-button" onClick={submitHandler}> Register&nbsp;&nbsp;<i class="fas fa-check-circle"></i></button>
        </div>
    </div>      
  </div>
  )
}