// we need to install react-wordcloud first by this command  npm install react-wordcloud

import React from "react";
import Item from "./Item";
import "./Item.css";
// import ReactWordcloud from 'react-wordcloud';
//import wordcloud2 from 'wordcloud2';

export default function ListItems(props) {
  console.log("listItems props", props);
  const itemData = props.items.map((i) => (
    <Item
      user={props.user}
      id={i.id}
      item={i.item}
      topics={i.topic}
      answers={i.answers}
      user_item={i.user_id}
      setCurrentItem={props.setCurrentItem}
    />
  ));
  return (
    <div>
      <div className="item-container">{itemData}</div>
    </div>
  );
}
