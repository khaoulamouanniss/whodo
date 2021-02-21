
import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
//import AnswerItem from "./AnswerItem"
//import useVisualMode from "../hooks/useVisualMode"

const itemCard  = {
  boxShadow: "0 2px 5px 0 rgb(247,137,37), 0 2px 10px 0 rgb(247,137,37)",
  borderRadius: "40px",
  display: "block",
  fontSize: "15px",
  float:"left",
  padding:"30px",
  width: "200px",
  margin:"20px",
  height:"300px",
  fontWeight: "bold",
};

const itemTopic = {
  fontSize: "18px",
  color: "rgb(247,137,37)"
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
  color :"black",
  fontSize : "15px",
  fontWeight:"bold"
}

export default function Item(props) {

  let topics=' #'+ props.topics.replace('/',' #');
  let answers =' ' + props.answers + ' answers';
  
  
  return (
    <div>
  <Link  to="/answer" style={itemButton} onClick={() => props.setCurrentItem({id:props.id, item:props.item})}>
    <div style={itemCard}> 
​
    <div>{props.item}</div>
    <div style={itemTopic}>{topics}</div>
    <div style={itemAnswer}>{answers}</div><br />
   
    
   
    </div>
    </Link>
    </div>
  )
}