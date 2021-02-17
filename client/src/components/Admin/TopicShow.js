
import React from "react";
import Item from "./Item"

export default function TopicShow(props) {
  
  const {topic_id,topic} = props.currentTopic;
  let newItem="";
  const itemData = props.items.map(i => <Item id ={i.id} item={i.item} approved={i.approved} setCurrentItem={props.setCurrentItem} deleteItem={props.deleteItem} topics={i.topic} answers ={i.answers}/>)
  return (
    <>
      <h1>{topic_id}{topic}</h1>
      <button >+</button>
      <input onChange={e => newItem=e.target.value}></input>
      <button onClick={() => props.addItem(newItem,topic,true)}>Add</button>
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