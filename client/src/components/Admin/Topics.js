import React from "react";
import Topic from "./Topic"

export default function Topics(props) {

  const topicData = props.topics.map(t => <Topic topicID={t.id} topic={t.topic} NbItems={parseInt(t.items)} setCurrentTopic={props.setCurrentTopic} showItemsByTopic={props.showItemsByTopic}/>)
  return(
    <>
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