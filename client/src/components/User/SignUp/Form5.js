//first install npm i react-select

import React, { useState } from "react";
import Select from 'react-select';
import {CountriesCities} from "./CountriesCities"
//import csc from 'country-state-city';
//import { ICountry, IState, ICity } from 'country-state-city'


import "./Form5.css";
export default function Form5(props) {
  //[country,setCountry] = useState("")
  const {details,setDetails, onNext, onBack, error} = props;console.log(details.gender);
  const countries = Object.keys(CountriesCities);
  let optionsCountry = countries.map(e => {return { value: e, label: e }})
  const[optionsCity,setOptionsCity]=useState([]);
  const[optionCity,setOptionCity]=useState("");
  const[optionCountry,setOptionCountry]=useState("");
  const handleChangeC = (selectedOption) => {
    setOptionCountry(selectedOption);
    let cities = CountriesCities[selectedOption.value];
    let optionsC = cities.map(e => {return { value: e, label: e }})
    setOptionsCity(optionsC)
    setDetails({...details, country:selectedOption.value})
    setOptionCity("")
  };

  // const handleChangeS = (selectedOption) => {
  //   setDetails({...details, region:selectedOption})
  // };
  
  const handleChangeCi = (selectedOption) => {
    setOptionCity(selectedOption)
    setDetails({...details, city:selectedOption.value})
  };
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
      // backgroundColor: isSelected ? "rgb(241, 184, 130)" : null,
      color: "#333333"
    };
  }
};
  
  return (
   
    <div className="form5">
      <div className="form5-form">   
        <div className="form5-welcome">
          Welcome message by kevin
        </div>     
        <div className="form5-data">
          <label className="form5-label" >Country</label>
          <div className="form5-input">
            <Select 
            value={optionCountry}
            onChange={handleChangeC}
            options={optionsCountry}
            placeholder={"Select a country"}
            styles={colourStyles}
            />
          </div>
        </div>
        {/* <div className="form5-data">
          <label className="form5-label" >State</label>
          <div className="form5-input">
            <Select 
                value={details.region}
                onChange={handleChangeS}
                options={options}
                placeholder="Select a state"
                styles={styles}
                />
          </div>
        </div> */}
        <div className="form5-data">
          <label className="form5-label" >City</label>
          <div className="form5-input">
            <Select 
                value={optionCity}
                onChange={handleChangeCi}
                options={optionsCity}
                placeholder="Select a city"
                styles={colourStyles}
                />
          </div>
        </div>
        <div className="form5-buttons">
        <button className="form5-button" onClick={onBack}><i class="fas fa-angle-double-left"></i>&nbsp;&nbsp;Back</button>
        <button className="form5-button" onClick={onNext}>Next&nbsp;&nbsp;<i class="fas fa-angle-double-right"></i></button>
        </div>
      </div>      
    </div>
  )
}