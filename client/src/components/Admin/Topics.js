import React from "react";
import Topic from "./Topic"

export default function Topics(props) {

  const topicData = props.topics.map(t => <Topic topicID={t.id} topic={t.topic} NbItems={parseInt(t.items)} setCurrentTopic={props.setCurrentTopic}/>)
  return(
    <>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"></link>
    <tbody>
     <table className="table">
        <thead>
          <tr>
            <th scope="col">Topic</th>
            <th scope="col">Number of items</th>
            <th scope="col">Show</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
          <tr>{topicData}</tr>
        </thead>
      </table>
      </tbody>
    </>
  )
}