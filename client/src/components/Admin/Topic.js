
import React from "react";
import {Link} from "react-router-dom"

export default function Topic(props) {

  const {topicID,topic,NbItems,setCurrentTopic,showItemsByTopic,deleteTopic} = props;

  return (
    <div>
      <th scope="col"><Link to="/topicShow" onClick={() => {  setCurrentTopic({topic_id:topicID,topic:topic});showItemsByTopic(topicID)} }>{topic}</Link></th>
      <th scope="col">{NbItems}</th>
      <th scope="col"><button onClick={() => deleteTopic(topicID)}>Delete</button></th>
    </div>
  )
}