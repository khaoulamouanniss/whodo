import React from "react";
//import ReactWordcloud from 'react-wordcloud';
import Topic from "./Topic";

const topicsBody = {
  border: "3px solid rgb(105, 104, 103)",
  width:"60%",
  borderRadius: "30px",
  boxShadow:"0px 0px 10px #000",
  marginTop: "50px",
  marginLeft:"280px",
  height:"400px",
  padding: "auto",
  height: "900px",
  backgroundImage: "linear-gradient(to bottom, rgba(214, 109, 49, 0.918), rgba(99, 57, 28, 0.918), rgba(24, 15, 7, 0.856))"
}
const signupLabel = {
    
  marginLeft : "180px",
  fontWeight: "bold",
  fontSize: "20px",
  color: "white" 
 
}

export default function ListTopics(props) {
  // const topics = props.topics.map(t =>{
  //   return {text:t.topic,value:parseInt(t.items)}
  // })

  // const callbacks = {
  //   getWordColor: word => {
  //     if (word.value < 5) {
  //       return "black";
  //     } else if (word.value === 5 ) {
  //       return "grey";
  //     } else {return "orange";}
  //   },
  //   onWordClick: props.addFavTopic(props.topics.userId,props.topics.id),
  //   onWordMouseOver: console.log,
  //   getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 5 ? "good" : "bad"}]`,
  // }

  // const options = {
  //   rotations: 2,
  //   rotationAngles: [-90, 0],
  // };
  // const size = [600, 400];
  const topicData = props.topics.map(t => <Topic topicID={t.id} topic={t.topic} userId={props.userId} addFavTopic={props.addFavTopic}/>)
  console.log("userId",props.userId)
  return (
    <div style={topicsBody}>

      <label style={signupLabel}> Choose your favourite topics</label>
      {/* <ReactWordcloud
      callbacks={callbacks}
      options={options}
      size={size}
      words={topics}
    />
    */}
    <ul>
      {topicData}
    </ul> 
    </div>
  );

}