
import React from "react";
// import "./Tpoic.css"


export default function Topic(props) {

  const {topicID,topic,userId,addFavTopic} = props;
//style = {topicButton}
  return (
    <div>
      <div >
        <button  className= "topicButton" onClick={() => addFavTopic(userId,topicID)}>{topic}</button>
     </div>
    </div>
  )
}