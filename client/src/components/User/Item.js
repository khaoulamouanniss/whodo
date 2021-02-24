
import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import User from "../Admin/User";
//import AnswerItem from "./AnswerItem"
//import useVisualMode from "../hooks/useVisualMode"


export default function Item(props) {

  // if(props.user.type!== "super") {
      let topics=' #'+ props.topics.replace('/',' #');
    // let answers =' ' + props.answers + ' answers';
  // }

  
  
  return (
    <div>
      <Link  to="/answer" className="item-button" onClick={() => props.setCurrentItem({id:props.id, item:props.item, topic:props.topics})}>
        <div className="item-card"> 
          <div style={{fontSize:"18px", fontFamily:"serif"}} className="item-item">{props.item}</div>
          <div style={{color:"rgb(247,137,37)" , fonSize: "11px"}} className="item-topic">{topics}</div>
        </div>
      </Link>
    </div>
  )
}