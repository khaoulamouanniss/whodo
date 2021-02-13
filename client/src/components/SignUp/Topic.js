
import React from "react";

export default function Topic(props) {

  const {topicID,topic,userId,addFavTopic} = props;

  return (
    <div>
     
     <button onClick={() =>addFavTopic(userId,topicID)}>{topic}</button>
    </div>
  )
}