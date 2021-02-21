
import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
//import AnswerItem from "./AnswerItem"
//import useVisualMode from "../hooks/useVisualMode"


export default function Item(props) {

  let topics=' #'+ props.topics.replace('/',' #');
  // let answers =' ' + props.answers + ' answers';
  
  
  return (
    <div>
      <Link  to="/answer" className="item-button" onClick={() => props.setCurrentItem({id:props.id, item:props.item})}>
        <div className="item-card"> 
          <div className="item-item">{props.item}</div>
          <div className="item-topic">{topics}</div>
        </div>
      </Link>
    </div>
  )
}