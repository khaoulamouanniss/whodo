
import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import AnswerItem from "./AnswerItem"
//import useVisualMode from "../hooks/useVisualMode"

export default function Item(props) {

 
/*
  const ITEM = "ITEM";
  const ANSWER = "ANSWER";


  const { mode, transition, back } = useVisualMode(ITEM);*/
  let topics=' #'+ props.topics.replace('/',' #');
  let answers =' ' + props.answers + ' answers';
  console.log(props);
  
  return (
    <div className = "w3-card"> 
​
    <div className = "w3-container ">{props.item}{topics}{answers}</div>
    <button className = "btn"><i className = "fa-envelope"></i>Answers</button>
   
    
     {/* <Link to="/answer">Answer</Link>
     {mode === ITEM && <div>{props.item}{topics}{answers}
     <button onClick={() => transition(ANSWER)}>Answer</button> </div>}
     {mode === ANSWER && <AnswerItem item={props.item} />}
     
      {props.item}{topics}{answers}
      <button onClick={() => answerItem(props.id)}>Answer</button> 
      */}  
   
    </div>
  )
}