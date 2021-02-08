import React from "react";

import Item from "./Item";

export default function ListItem(props) {

  const itemData = props.items.map(i => <Item item={i} />)
  return (
    <ul>
      {itemData}
    </ul>
  );

}