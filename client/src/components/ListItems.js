import React from "react";

import Item from "./Item";

export default function ListItem(props) {

  const itemData = props.items.map(i => <Item item={i.item} topics={i.topic} answers ={i.answers}/>)
  return (
    <ul>
      {itemData}
    </ul>
  );

}