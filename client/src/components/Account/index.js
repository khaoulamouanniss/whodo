import React,{useState} from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import Show from "./Show";
import useVisualMode from "../../hooks/useVisualMode"

export default function Account(props) {

  const FORM1 = "FORM1";
  const FORM2 = "FORM2";
  const FORM3 = "FORM3";
  const FORM4 = "FORM4";
  const SHOW = "SHOW";

const { mode, transition, back } = useVisualMode(FORM1);

  const{signup, error} = props;

  const [details, setDetails] = useState({
    name: "",
    lastName:"",     
    birthDate:"",
    gender:"",
    email: "",
    password: "",
    profilePic : "",
    country: "",
    region: "",
    city: "",
    referrer: "referrer",
    type: "normal",
    relationship: "",
    family: "" 
  });

  const submitHandler = event => {
    event.preventDefault();
    signup(details);
  };

  return (
    <div>
     {mode === FORM1 && <Form1 details={details} setDetails={setDetails} onNext={() => transition(FORM2)} error={props.error}/>}
     {mode === FORM2 && <Form2 details={details} setDetails={setDetails} onNext={() => transition(FORM3)} error={props.error}/>}
     {mode === FORM3 && <Form3 details={details} setDetails={setDetails} onNext={() => transition(FORM4)} error={props.error}/>}
     {mode === FORM4 && <Form4 details={details} setDetails={setDetails} onNext={() => transition(SHOW)} error={props.error}/>} 
      {mode === SHOW && <Show/> }
    </div>
  )
}