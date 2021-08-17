import React from "react";

//import "./PreviousItem.css";

export default function PreviousItem(props) {
  return (
    <div className="page-title">
      {props.id}

      <div className="">{props.item} </div>
      <div className="">{props.answer} </div>
    </div>
  );
}
