import React,{useState} from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import ListTopics from "./ListTopics";
import useVisualMode from "../../hooks/useVisualMode"

export default function SignUp(props) {

  const FORM1 = "FORM1";
  const FORM2 = "FORM2";
  const FORM3 = "FORM3";
  const FORM4 = "FORM4";
  const TOPICS = "TOPICS";

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
      signup(details);
      console.log("Iam into then")
      transition(TOPICS);
  };

  return (
    <div>
        {mode === FORM1 && <Form1 details={details} setDetails={setDetails} onNext={() => transition(FORM2)} error={props.error}/>}
        {mode === FORM2 && <Form2 details={details} setDetails={setDetails} onNext={() => transition(FORM3)} error={props.error}/>}
        {mode === FORM3 && <Form3 details={details} setDetails={setDetails} onNext={() => transition(FORM4)} error={props.error}/>}
        {mode === FORM4 && <Form4 details={details} setDetails={setDetails} onNext={() => transition(TOPICS)} error={props.error} submitHandler={submitHandler}/>} 
      
       
      {mode === TOPICS && <ListTopics topics={props.topics}/> }
    </div>
  )
}