import React from "react";
import Topic from "./Topic";
import "./Topic.css"
// import ReactWordcloud from 'react-wordcloud';
import {useHistory} from"react-router-dom"





export default function ListTopics(props) {
  let history=useHistory();
  const topicData = props.topics.map(t => <Topic topicID={t.id} topic={t.topic} userId={props.userId} addFavTopic={props.addFavTopic}/>)
  console.log("userId",props.userId)
  return (
    <div className="topics-container">
      <label className="topics-label"> Select your favourite topics:</label>
      <div className ="topics-buttons">
        {topicData}
      </div>
      <button className="form7-button" onClick={()=>history.push("/")}>Done&nbsp;&nbsp;<i class="fas fa-check-circle"></i></button>
    </div>
  );

} 