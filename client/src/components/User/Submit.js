import React from "react";
import axios from 'axios';
import {Link, useHistory} from "react-router-dom";
import "./Submit.css";


export default function Submit(props) {

const {change, setChange, user} = props
  let history = useHistory();

  const submitItem  = (submittedItem,approved) => {
    const re = /#([a-zA-Z0-9])+/gm
    let submittedTopics = [];
    let matches =[];
    let topic = "";
    let item = submittedItem;
    while (matches = re.exec(submittedItem)) {
      
      topic=matches[0].replace('#','');
      submittedTopics.push(topic);  
      console.log("topic",topic);
      item = item.replace(matches[0],'').trimEnd();  
      console.log("item",item)
    }
    let time = new Date();
  axios.post("http://localhost:8001/items",{creator:user.id, item:item, time:time, approved:approved, topics:submittedTopics})
  .then(res => {
    console.log("submittedItem",res.data); 
    setChange(!change)
    history.push("/myitems");
  })
  
 
 }
  const handleChange = () => {
    submitItem(document.getElementById("item").value, false);
    console.log('history',history)
    history.push("/myitems");
  }
 /* let item="";
  onChange={(event) => item=event.target.value}*/
  return (
    <div className= "textareaContainer">
    <div className="submit-message">Some text to put here</div>
    <textarea className = "textArea" id="item" maxlength='80' type ="text" rows="5" cols="50"></textarea>
    <div>
    <Link className= "text-button" to ="/submit" onClick={handleChange}><i style={{fontSize:20}} class="fas fa-hashtag"></i>&nbsp;&nbsp;Submit</Link>
    </div></div>
  )
}