
import React from "react";
import {Link} from "react-router-dom";
import "./SubmittedItems.css"

export default function SubmittedItem(props) {

  const {id,item,approved,setCurrentItem,deleteItem} = props;
  let topics= props.topics? ' #'+ props.topics.replace('/',' #') : "";
  let answers = props.answers? ' ' + props.answers + ' answers' : "";

  return (approved ? (
    <div>
      <th scope="col"> <Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{item}{topics}</Link></th>
      <th scope="col">{answers}</th>
    <th scope="col"> Approved</th>
      <th scope="col"><button onClick={() => deleteItem(id)}>Delete</button></th>
    </div>
  ) : (<div>
     <div className = "submittedItemsContainer">
     <th className = "th-Items"scope="col">{item}{topics}</th>
    <th className = "th-Items" scope="col">{answers}</th>
    <th className = "th-Items"scope="col"> Waiting...</th>
    <th scope="col"><button className= "deleteBtn"onClick={() => deleteItem(id)}>Delete</button></th>
     </div>
    
  </div>)
  )
}