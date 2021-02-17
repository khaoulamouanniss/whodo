import React from "react";
import Item from "./Item"

export default function Items(props) {

  let newItem="";
  const itemData = props.items.map(i => <Item id ={i.id} item={i.item} approved={i.approved} setCurrentItem={props.setCurrentItem} deleteItem={props.deleteItem} topics={i.topic} answers ={i.answers}/>)
  return(
    <>
    
    <button >+</button>
    <input onChange={e => newItem=e.target.value}></input>
    <button onClick={() => props.submitItem(newItem,true)}>Add</button>
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