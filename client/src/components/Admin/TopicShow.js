
import React from "react";
import Item from "./Item"

export default function TopicShow(props) {

  const {topic_id,topic} = props.currentTopic;
 
 const itemData = props.items.map(i => <Item id ={i.id} item={i.item} setCurrentItem={props.setCurrentItem}/>)
  return (
    <>
      <h1>{topic_id}{topic}</h1>
      <tbody>
     <table className="table">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Number of items</th>
            <th scope="col">Delete</th>
          </tr>
          <tr>{itemData}</tr>
        </thead>
      </table>
      </tbody>
    </>
  )
}