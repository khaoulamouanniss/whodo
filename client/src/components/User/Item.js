import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import User from "../Admin/User";
//import AnswerItem from "./AnswerItem"
//import useVisualMode from "../hooks/useVisualMode"

export default function Item(props) {
  console.log("have a look at the props of the item", props.replied);
  return (
    <div>
      <Link
        to="/answer"
        className={props.replied ? "item-button-disabled" : "item-button"}
        onClick={() =>
          props.setCurrentItem({
            id: props.id,
            item: props.item,
            topic: props.topics,
            replied: props.replied,
          })
        }
      >
        <div className="item-card">
          <div
            style={{ fontSize: "18px", fontFamily: "serif" }}
            className="item-item"
          >
            {props.item}
          </div>
          <div
            style={{ color: "rgb(247,137,37)", fonSize: "11px" }}
            className="item-topic"
          >
            {props.topics}
          </div>
        </div>
      </Link>
    </div>
  );
}
