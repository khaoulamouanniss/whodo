import React from "react";
import SubmittedItem from "./SubmittedItem"

export default function SubmittedItems(props) {

  const itemData = props.items.map(i => <SubmittedItem id ={i.id} item={i.item} approved={i.approved} setCurrentItem={props.setCurrentItem} deleteItem={props.deleteItem} topics={i.topic} answers ={i.answers}/>)
  return(
    <>
    <tbody>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Number of answers</th>
          <th scope="col">Approved</th>
          <th scope="col">Delete</th>
        </tr>
        <tr>{itemData}</tr>
      </thead>
    </table>
    </tbody>
  </>
  )
}