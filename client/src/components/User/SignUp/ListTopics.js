import React from "react";
import Topic from "./Topic";
import "./Topic.css"
import ReactWordcloud from 'react-wordcloud';






export default function ListTopics(props) {
  
  const topicData = props.topics.map(t => <Topic topicID={t.id} topic={t.topic} userId={props.userId} addFavTopic={props.addFavTopic}/>)
  console.log("userId",props.userId)
  return (
    <div className="topics-container">
      <label className="topics-label"> Choose your favourite topics</label>
      <div className ="topics-buttons">
        {topicData}
      </div>
    </div>
  );

} 