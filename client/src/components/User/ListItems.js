// we need to install react-wordcloud first by this command  npm install react-wordcloud

import React from "react";
import Item from "./Item";
import ReactWordcloud from 'react-wordcloud';
//import wordcloud2 from 'wordcloud2';

 export default function ListItems(props) {
 // wordcloud2(demoFreq, figPath = "twitter.jpg";
 

  const topics = props.topics.map(t =>{
    return {text:t.topic,value:parseInt(t.items)}
  })

  const callbacks = {
    getWordColor: word => {
      if (word.value < 5) {
        return "black";
      } else if (word.value === 5 ) {
        return "grey";
      } else {return "orange";}
    },
    onWordClick: console.log,
    onWordMouseOver: console.log,
    getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 5 ? "good" : "bad"}]`,
  }
  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
  };
  const size = [600, 400];
  
  

  const itemData = props.items.map(i => <Item id ={i.id} item={i.item} topics={i.topic} answers ={i.answers} setCurrentItem={props.setCurrentItem}/>)
  return (
    <div>
    <div style={{ marginTop: "5px", marginLeft:"200px"}}>
     {/* <ReactWordcloud
      callbacks={callbacks}
      options={options}
      size={size}
      words={topics}
    /> */}
    </div>
    <ul>
      {itemData}
    </ul>
    </div>
  );

}