import React from "react";
import {Link} from "react-router-dom";
import "./Submit.css";


export default function Submit(props) {

 /* let item="";
  onChange={(event) => item=event.target.value}*/
  return (
    <div className= "textareaContainer">
      
    <textarea className = "textArea" id="item" type ="text" rows="5" cols="50"></textarea>
    <div>
    <Link className= "textBtn" to ="/submit" onClick={() => props.submitItem(document.getElementById("item").value, false)}>Submit</Link>
    </div></div>
  )
}