import React from "react";
import "./SignUp.css";
//import { Dropdown } from 'semantic-ui-react'
export default function Form3(props) {

  //counntries
  const countryOptions = [
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
    { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
    { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
  ]
  
  const {details,setDetails, onNext, error} = props;
  
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

  return (
   <div style={signupContainer}>
      <div style={signupForm}>
      <div style={{ marginTop: 10 }}>
        <label style={signupLabel} > Country<br /></label>
        {/* <Dropdown
          placeholder='Select Country'
          fluid
          search
          selection
          options={countryOptions}
        /> */}
        <input style={signupInput} type="text" value={details.country} onChange={event => setDetails({...details, country:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={signupLabel} >Region<br /></label>
        <input style={signupInput} type="text" value={details.region} onChange={event => setDetails({...details, region:event.target.value})}/>
      </div>
      <div style={{ marginTop: 10 }}>
      <label style={signupLabel} >City<br /></label>
        <input style={signupInput} type="text" value={details.city} onChange={event => setDetails({...details, city:event.target.value})}/>
      </div>
      <button style={nextButton} onClick={onNext}>Next</button>
      <button style={cancelButton}>Back</button>
   </div></div>
  )
}