import React from "react";

import Item from "./Item";

export default function ListItems(props) {

  const itemData = props.items.map(i => <Item id ={i.id} item={i.item} topics={i.topic} answers ={i.answers} />)
  return (
    <ul>
      {itemData}
    </ul>
  );

}