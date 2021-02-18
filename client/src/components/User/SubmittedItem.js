
import React from "react";
import {Link} from "react-router-dom"

export default function SubmittedItem(props) {

  const {id,item,approved,setCurrentItem,deleteItem} = props;
  let topics= props.topics? ' #'+ props.topics.replace('/',' #') : "";
  let answers = props.answers? ' ' + props.answers + ' answers' : "";

  return (approved ? (
    <div>
      <th scope="col"> <Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{item}{topics}</Link>{answers}Approved</th>
      <th scope="col"><button onClick={() => deleteItem(id)}>Delete</button></th>
    </div>
  ) : (<div>
    <th scope="col">{item}{topics}{answers}Waiting...</th>
    <th scope="col"><button onClick={() => deleteItem(id)}>Delete</button></th>
  </div>)
  )
}