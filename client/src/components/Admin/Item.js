
import React from "react";
import {Link} from "react-router-dom";
import "./Items.css"

export default function Item(props) {

  const {id,item,setCurrentItem,deleteItem} = props;
  let topics= props.topics? ' #'+ props.topics.replace('/',' #') : "";
  let answers = props.answers? ' ' + props.answers + ' answers' : "";

  return (
    <div>
      <tr>
      <td className = "itemstd"><Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item,topic:props.topics})}>{item} {topics}{answers}</Link></td>
      <td className= "itemstd"><button onClick={() => deleteItem(id)}>Delete</button></td>
      </tr>
   
    </div>
  )
}