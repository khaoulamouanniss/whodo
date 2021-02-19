
import React from "react";
import {Link} from "react-router-dom";
import "./Topics.css";

export default function Topic(props) {

  const {topicID,topic,NbItems,setCurrentTopic,showItemsByTopic,deleteTopic} = props;

  return (
    <div>
      <tr>
      <td className="topicstd"><Link to="/topicShow" onClick={() => {  setCurrentTopic({topic_id:topicID,topic:topic});showItemsByTopic(topicID)} }>{topic}</Link></td>
      <td className="topicstd">{NbItems}</td>
      <td className="topicstd"><button onClick={() => deleteTopic(topicID)}>Delete</button></td>
      </tr>
      
    </div>
  )
}