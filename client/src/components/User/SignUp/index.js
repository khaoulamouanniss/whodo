import React,{useState} from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import Form5 from "./Form5";
import Form6 from "./Form6";
import ListTopics from "./ListTopics";
import useVisualMode from "../../../hooks/useVisualMode"



export default function SignUp(props) {

  const FORM1 = "FORM1";
  const FORM2 = "FORM2";
  const FORM3 = "FORM3";
  const FORM4 = "FORM4";
  const FORM5 = "FORM5";
  const FORM6 = "FORM6";
  const TOPICS = "TOPICS";

const { mode, transition, back } = useVisualMode(FORM1);

  const{signup, addFavTopic, loginGF, user, signupGF} = props;

  const [gf, setGf] = useState(false);
  const [details, setDetails] = useState({});

  const submitHandler = event => {
    if(gf) {
      signupGF(details)
    }
    else {
      signup(details)
    }
     // console.log("Iam into then")
      transition(TOPICS); 
  };

  return (
    <div>
      {mode === FORM1 && <Form1 user={user} details={details} setDetails={setDetails} onNext={() => transition(FORM2)} loginGF={loginGF} onGF={() => transition(FORM3)} setGf={setGf}/>}
      {mode === FORM2 && <Form2 details={details} setDetails={setDetails} onNext={() => transition(FORM3)} onBack={() => back()} error={props.error}/>}
      {mode === FORM3 && <Form3 details={details} setDetails={setDetails} onNext={() => transition(FORM4)} onBack={() => back()} error={props.error}/>}
      {mode === FORM4 && <Form4 details={details} setDetails={setDetails} onNext={() => transition(FORM5)} onBack={() => back()} error={props.error} />}        
      {mode === FORM5 && <Form5 details={details} setDetails={setDetails} onNext={() => transition(FORM6)} onBack={() => back()} error={props.error} />}        
      {mode === FORM6 && <Form6 details={details} setDetails={setDetails} onNext={() => transition(TOPICS)} error={props.error} submitHandler={submitHandler} />}        
      {mode === TOPICS && <ListTopics addFavTopic={addFavTopic} topics={props.topics} userId={props.userId}/> }
    
    </div>
  )
}