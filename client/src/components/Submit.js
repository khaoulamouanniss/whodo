import React from "react";
import {Link} from "react-router-dom"


export default function Submit(props) {

 /* let item="";
  onChange={(event) => item=event.target.value}*/
  return (
    <div>
      
    <input id="item" type ="text" rows="5" cols="50"></input>
    <Link to ="/submit" onClick={() => props.submitItem(document.getElementById("item").value)}>Submit</Link>
    </div>
  )
}