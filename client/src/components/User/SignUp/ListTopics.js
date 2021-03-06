import React from "react";
import Topic from "./Topic";
import "./Topic.css"
import ReactWordcloud from 'react-wordcloud';
import {useHistory} from"react-router-dom"





export default function ListTopics(props) {

  const topics = props.topics.map(t =>{
    return {text:t.topic,id:t.id,value:(parseInt(t.items))}
  })

  const clickTopic =(word) => {
    props.addFavTopic(props.userId,word.id)
    console.log(word)
  }
  const hoverTopic = (word) => {
    console.log(word)
  }
  const callbacks = {
    getWordColor: word => {
      if (word.value === 1) {
        return "grey";
      }else if (word.value >=1 && word.value < 3 ) {
        return "rgb(247, 151, 62)";
      }else if (word.value >= 3 && word.value < 5 ) {
        return "rgb(247,137,37)";
      } else if (word.value === 5 ) {
        return "black";
      } else {return "rgb(247,137,37)";}
    },
    onWordClick: clickTopic,
   // onWordMouseOver: hoverTopic,
    getWordTooltip: word => `${word.text}`,
  }
  const options = {
    rotations: 5,
    rotationAngles: [15,-10,10,-15],
  };
  const size = [600,500, 400];
  
  
  let history=useHistory();
  // const topicData = props.topics.map(t => <Topic topicID={t.id} topic={t.topic} userId={props.userId} addFavTopic={props.addFavTopic}/>)
  // console.log("userId",props.userId)
  return (
    <div className="topics-container">
      <div className="form7-welcome">
         Please choose your favourite topics.    
      </div>

    <div style={{ marginTop: "1px", marginLeft:"200px"}}>
     <ReactWordcloud
      callbacks={callbacks}
      options={options}
      size={size}
      words={topics}
    />
     </div>
    
      {/* <label className="topics-label"> Choose your favourite topics</label>
      <div className ="topics-buttons">
        {topicData}
      </div> */}
      <button className="form7-button" onClick={()=>history.push("/")}>Done&nbsp;&nbsp;<i class="fas fa-check-circle"></i></button>
    </div>
  );

} 