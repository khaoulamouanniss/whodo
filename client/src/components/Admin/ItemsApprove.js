import React from "react";
import ItemApprove from "./ItemApprove"

export default function ItemsApprove(props) {

  
  const itemData = props.items.map(i => <ItemApprove id ={i.id} item={i.item} approved={i.approved} setCurrentItem={props.setCurrentItem} approveItem={props.approveItem} deleteItem={props.deleteItem} topics={i.topic} answers ={i.answers}/>)
  return(
    <>
    <tbody>
   <table className="table">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Number of answers</th>
          <th scope="col">Approve</th>
        </tr>
        <tr>{itemData}</tr>
      </thead>
    </table>
    </tbody>
  </>
  )
}