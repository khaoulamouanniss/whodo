import React from "react";
import * as FcIcons from "react-icons/fc";

import "./PreviousItems.css";

export default function PreviousItem(props) {
  const { favorite, id, favoriteSearch, item, answer } = props;
  console.log("shouff element we7ed", props);
  return (
    <div className="prev-item">
      {favoriteSearch && favorite && (
        <div className="prev-answer-details">
          <div className="prev-item">{item}</div>
          <div className="your-answer">{answer} </div>
          <div className="most-ppl-answer">always</div>
        </div>
      )}
      {!favoriteSearch && (
        <div className="prev-answer-details">
          <div className="prev-item">
            <FcIcons.FcRedo></FcIcons.FcRedo>
            {item}{" "}
          </div>
          <div className="your-answer">{answer} </div>
          <div className="most-ppl-answer">always</div>
        </div>
      )}
    </div>
  );
}
