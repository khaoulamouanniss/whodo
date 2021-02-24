import React from "react";
import SubmittedItem from "./SubmittedItem";
import "./SubmittedItems.css"

export default function SubmittedItems(props) {

  const itemData = props.items.map(i => <SubmittedItem id ={i.id} item={i.item} approved={i.approved} setCurrentItem={props.setCurrentItem} deleteItem={props.deleteItem} topics={i.topic} answers ={i.answers}/>)
  return(
    <div className = "items-container">
      <div className="item-message"> Here you can find your submitted messages and check if they are approved</div>
       {itemData}
       <div style={{color:"rgb(51, 50, 50)", width:"70%", fontSize:"18px", marginTop:"3%", marginLeft:"20%"}}>
          After getting an item approved, you can access your items and filter the results of answers.
          </div> 
    </div>
  )
}