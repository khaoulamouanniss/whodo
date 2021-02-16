import React,{useState} from "react";
import Show from "./Show";
import Update from "./Update";

import useVisualMode from "../../../hooks/useVisualMode"

export default function Account(props) {

  

 

  const SHOW = "SHOW";
  const UPDATE = "UPDATE";
  

const { mode, transition, back } = useVisualMode(SHOW);

  const{signup, error, user} = props;

  return (
    <div>
     {mode === SHOW && <Show user={user}  onUpdate={() => transition(UPDATE)} />}
     {mode === UPDATE && <Update  user={user}  signup={signup} error={props.error} />}
     
    </div>
  )
}