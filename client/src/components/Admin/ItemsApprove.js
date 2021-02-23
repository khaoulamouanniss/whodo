import React from "react";
import ItemApprove from "./ItemApprove";
import "./ItemsApprove.css"

export default function ItemsApprove(props) {

  
  const itemData = props.items.map(i => <ItemApprove id ={i.id} item={i.item} approved={i.approved} setCurrentItem={props.setCurrentItem} approveItem={props.approveItem} deleteItem={props.deleteItem} topics={i.topic} answers ={i.answers}/>)
  return(
    <>
    <div className ="itemsapprovetable ">
      <div className = "itemsapprovetd-container" style={{marginTop:"20%"}}>
      {itemData}
      </div>
    </div>
  </>
  )
}