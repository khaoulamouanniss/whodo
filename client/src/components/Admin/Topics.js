import React from "react";
import Topic from "./Topic"

export default function Topics(props) {

  let newTopic="";
  const topicData = props.topics.map(t => <Topic topicID={t.id} topic={t.topic} NbItems={parseInt(t.items)} setCurrentTopic={props.setCurrentTopic} deleteTopic={props.deleteTopic} showItemsByTopic={props.showItemsByTopic}/>)
  return(
    <>
    <button >+</button>
    <input onChange={e => newTopic=e.target.value}></input>
    <button onClick={() => props.addTopic(newTopic)}>Add</button>
    <tbody>
     <table className="table">
        <thead>
          <tr>
            <th scope="col">Topic</th>
            <th scope="col">Number of items</th>
            <th scope="col">Delete</th>
          </tr>
          <tr>{topicData}</tr>
        </thead>
      </table>
      </tbody>
    </>
  )
}