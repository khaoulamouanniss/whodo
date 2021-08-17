import React from "react";
import PreviousItem from "./PreviousItem";
import "./PreviousItems.css";

export default function PreviousItems(props) {
  function onHandle(event) {
    event.preventDefault();
    props.setHandleSearch(event.target.value);
  }
  const itemData = props.items.map((i) => (
    <PreviousItem id={i.id} item={i.item} answer={i.user_answer} />
  ));
  return (
    <div className="page-title">
      {" "}
      Items
      <div className="search-bar">
        {" "}
        <input
          type="text"
          className="inputSearch"
          onKeyUp={(e) => onHandle(e)}
        />{" "}
      </div>
      {itemData}
    </div>
  );
}
