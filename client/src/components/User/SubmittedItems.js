import React from "react";
import SubmittedItem from "./SubmittedItem";
import "./SubmittedItems.css"

export default function SubmittedItems(props) {

  const itemData = props.items.map(i => <SubmittedItem id ={i.id} item={i.item} approved={i.approved} setCurrentItem={props.setCurrentItem} deleteItem={props.deleteItem} topics={i.topic} answers ={i.answers}/>)
  return(
    <div className = "tableConatainer">
   
    <table className="table1">
      {/* <tr>
          <th>Item</th>
          <th>Number of answers</th>
          <th>Approved</th>
          <th>Delete</th>
        </tr> */}
      
       {itemData}
         
        
     
    </table>
  
  </div>
  )
}