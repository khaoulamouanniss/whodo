
import React from "react";
import "./Topic.css"


export default function Topic(props) {

  const {topicID,topic,userId,addFavTopic} = props;
//style = {topicButton}
  return (
    <div>
      <button  className= "topic-button" onClick={() => addFavTopic(userId,topicID)}>{topic}</button>
    </div>
  )
}