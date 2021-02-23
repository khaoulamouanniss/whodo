  import React from "react";
  import Topic from "./Topic";
  import "./Topics.css"

  export default function Topics(props) {

    let newTopic="";
    const topicData = props.topics.map(t => <Topic topicID={t.id} topic={t.topic} NbItems={parseInt(t.items)} setCurrentTopic={props.setCurrentTopic} deleteTopic={props.deleteTopic} showItemsByTopic={props.showItemsByTopic}/>)
    return(
      <>
      <div className="topics-container">
      <input className="topicsinput" placeholder="Type a topic" onChange={e => newTopic=e.target.value}></input>
      <i onClick={() => props.addTopic(newTopic)} style={{marginLeft:"50%", marginTop:"-5%", padding:"2px"}} class="topicsfas1 fa-plus-square"></i>
    
      </div>
       <div className = "topicstable">
         <div  className="topicstd-container">
         {topicData}
         </div>
         </div>
      </>
    )
  }