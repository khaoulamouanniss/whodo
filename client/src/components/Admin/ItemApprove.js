
import React from "react";
import {Link} from "react-router-dom";
import "./ItemsApprove.css"

export default function ItemApprove(props) {

  const {id,item,setCurrentItem,approveItem,deleteItem} = props;
  let topics= props.topics? ' #'+ props.topics.replace('/',' #') : "";
  let answers = props.answers? ' ' + props.answers + ' answers' : "";

  return (
    <div>
      <tr>
      <td className= "itemsapprovetd"><Link to="/itemShow" onClick={()=>setCurrentItem({id:id,item:item})}>{item}{topics}{answers}</Link></td>
      <td className= "itemsapprovetd"><button onClick={() => approveItem(id)}>Approve</button></td>
      <td className= "itemsapprovetd"><button onClick={() => deleteItem(id)}>Delete</button></td>

      </tr>
   
    </div>
  )
}