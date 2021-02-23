            
import React from "react";
import Item from "./Item"

export default function TopicShow(props) {
  
  const {topic_id,topic} = props.currentTopic;
  let newItem="";
  const itemData = props.items.map(i => <Item id ={i.id} item={i.item} approved={i.approved} setCurrentItem={props.setCurrentItem} deleteItem={props.deleteItem} topics={i.topic} answers ={i.answers}/>)
  return (
    <>
      {/* <h1>{topic_id}{topic}</h1> */}
      <div className="topics-container">
      <input className="topicsinput" onChange={e => newItem=e.target.value} style={{marginTop:"4%"}}></input>
      <i onClick={() => props.addItem(newItem,[topic],true)}  style={{marginLeft:"25%", marginTop:"-4%"}} class="topicsfas1 fa-plus-square"></i>
      </div>
      
     <div className="topicstable">
      <div className ="topicstd-container" style={{width:"160%",marginLeft:"-20%"}}>
      {itemData}
      </div>
         
      </div>
    </>
  )
}