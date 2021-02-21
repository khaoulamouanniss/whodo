  import React from "react";
  import Topic from "./Topic";
  import "./Topics.css" 

  export default function Topics(props) {

    let newTopic="";
    const topicData = props.topics.map(t => <Topic topicID={t.id} topic={t.topic} NbItems={parseInt(t.items)} setCurrentTopic={props.setCurrentTopic} deleteTopic={props.deleteTopic} showItemsByTopic={props.showItemsByTopic}/>)
    return(
      <>
      <div style={{marginLeft:"35%", marginTop:"25px"}}>
      <button style={{fontSize:"25px"}}>+</button>
      <input style={{fontSize:"25px", borderRadius:"35px", outline:"none"}} onChange={e => newTopic=e.target.value}></input>
      <button style={{fontSize:"25px",width:"95px", borderRadius:"40%", ouline:"none"}} onClick={() => props.addTopic(newTopic)}>Add</button>

      </div>
    
      <tbody>
        <div className="topicFilter"></div>
      <table className = "topicsTable">
          <thead>
            {/* <tr>
              <th className = "topicsth">Topic</th>
              <th className = "topicsth">Number of items</th>
              <th className = "topicsth">Delete</th>
            </tr> */}
            <tr>
              <td> {topicData}</td></tr>
          </thead>
        </table>
        </tbody>
      </>
    )
  }