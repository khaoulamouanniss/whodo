
import React from "react";

const topicButton = {
  backgroundColor:"transparent",
  border: "solid black",
  color:  "white",
  padding: "20px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "4px 2px",
  height:"auto",
  borderRadius: "12px",
  outline:"none"
}

export default function Topic(props) {

  const {topicID,topic,userId,addFavTopic} = props;

  return (
    <div>
     
     <button style = {topicButton} onClick={() =>addFavTopic(userId,topicID)}>{topic}</button>
    </div>
  )
}