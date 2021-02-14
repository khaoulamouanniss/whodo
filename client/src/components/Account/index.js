import React,{useState} from "react";
import Show from "./Show";
import Update from "./Update";

import useVisualMode from "../../hooks/useVisualMode"

export default function Account(props) {

  const [details, setDetails] = useState({
    name: "",
    last_name:"",     
    birth_date:"",
    gender:"",
    email: "",
    password: "",
    profile_pic : "",
    country: "",
    region: "",
    city: "",
    referrer: "referrer",
    type: "normal",
    relationship: "",
    family: "" 
  });

 

  const SHOW = "SHOW";
  const UPDATE = "UPDATE";
  

const { mode, transition, back } = useVisualMode(SHOW);

  const{signup, error, user} = props;

  return (
    <div>
     {mode === SHOW && <Show user={user} details={details} setDetails={setDetails} onUpdate={() => transition(UPDATE)} />}
     {mode === UPDATE && <Update  user={user} details={details} setDetails={setDetails} signup={signup} error={props.error}/>}
     
    </div>
  )
}