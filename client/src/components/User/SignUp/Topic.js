
import React from "react";

const topicButton = {
  backgroundColor:"transparent",
  border: "solid rgb(247,137,37)",
  color:  "black",
  textAlign: "center",
  margin: "4px 2px",
  height:"50px",
  outline:"none",
  float:"left",
  margin:"20px",
  width:"250px",
  borderRadius:"35px",
  fontWeight:"bold",
  fontSize:"25px",
}

export default function Topic(props) {

  const {topicID,topic,userId,addFavTopic} = props;
//style = {topicButton}
  return (
    <div>
     <button  onClick={() => addFavTopic(userId,topicID)}>{topic}</button>
    </div>
  )
}