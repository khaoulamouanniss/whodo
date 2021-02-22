import React from "react";
import {Link, useHistory} from "react-router-dom";
import "./Submit.css";


export default function Submit(props) {

  let history = useHistory();
  const handleChange = () => {
    props.submitItem(document.getElementById("item").value, false);
    history.push("/myitems");
  }
 /* let item="";
  onChange={(event) => item=event.target.value}*/
  return (
    <div className= "textareaContainer">
    <div className="submit-message">Some text to put here</div>
    <textarea className = "textArea" id="item" maxlength='80' type ="text" rows="5" cols="50"></textarea>
    <div>
    <Link className= "text-button" to ="/submit" onClick={() => handleChange()}><i style={{fontSize:20}} class="fas fa-hashtag"></i>&nbsp;&nbsp;Submit</Link>
    </div></div>
  )
}