
import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
//import AnswerItem from "./AnswerItem"
//import useVisualMode from "../hooks/useVisualMode"

const itemCard  = {
  boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
  borderRadius: "40px",
  display: "block",
  fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
  fontSize: "15px",
  float:"left",
  padding:"30px",
  width: "200px",
  margin:"20px",
  height:"250px",
  fontWeight: "bold",
  "&:hover" : {
    backgroundColor: "linear-gradient(to top, rgba(214, 109, 49, 0.918), rgba(248, 246, 245, 0.856))!important"
  }
};
// const itemCard:hover {
//   background-image: linear-gradient(to top, rgba(214, 109, 49, 0.918), rgba(248, 246, 245, 0.856))!important;
// }
const itemTopic = {
  fontSize: "18px",
  color: "orange"
}
const itemButton = {
  marginBottom:"50px",
  borderColor: "black",
  borderRadius: "10px",
  color: "#000!important",
  backgroundColor: "transparent!important",
  display: "block",
  width: "100%",
  padding:"10px",
  fontWeight: "bold"
}
const itemAnswer = {
  color :"grey",
  fontSize : "12px"
}

export default function Item(props) {

 
/*
  const ITEM = "ITEM";
  const ANSWER = "ANSWER";


  const { mode, transition, back } = useVisualMode(ITEM);*/
  let topics=' #'+ props.topics.replace('/',' #');
  let answers =' ' + props.answers + ' answers';
  
  
  return (
    <div style={itemCard}> 
​
    <div>{props.item}</div>
    <div style={itemTopic}>{topics}</div>
    <div style={itemAnswer}>{answers}</div>
    <Link  to="/answer" style={itemButton} onClick={() => props.setCurrentItem(props.item)}>Answer</Link>
    
   
    
     {/* <button className = "btn"><i className = "fa-envelope"></i>Answers</button>
     {mode === ITEM && <div>{props.item}{topics}{answers}
     <button onClick={() => transition(ANSWER)}>Answer</button> </div>}
     {mode === ANSWER && <AnswerItem item={props.item} />}
     
      {props.item}{topics}{answers}
      <button onClick={() => answerItem(props.id)}>Answer</button> 
      */}  
   
    </div>
  )
}