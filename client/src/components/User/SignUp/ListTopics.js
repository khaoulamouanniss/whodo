import React from "react";
import Topic from "./Topic";
import ReactWordcloud from 'react-wordcloud';


const topicsBody = {
  border: "rgb(247,137,37)",
  width:"60%",
  borderRadius: "30px",
  marginTop: "50px",
  marginLeft:"280px",
  height:"400px",
  padding: "auto",
  height: "900px",
  fontSize:"30px",
  color:"black"
}
const signupLabel = {
  marginLeft : "250px",
  fontWeight: "bold",
  fontSize: "20px",
  color: "black", 
  fontSize:"30px",
 
}



export default function ListTopics(props) {
  
  const topicData = props.topics.map(t => <Topic topicID={t.id} topic={t.topic} userId={props.userId} addFavTopic={props.addFavTopic}/>)
  console.log("userId",props.userId)
  return (
    <div style={topicsBody}>

      <label style={signupLabel}> Choose your favourite topics</label>
    <ul>
      {topicData}
    </ul> 
    </div>
  );

}