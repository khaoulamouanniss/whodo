import React from "react";
import * as FcIcons from "react-icons/fc";

import "./PreviousItems.css";
import srcShare from "../images/Share_Active.png";

export default function PreviousItem(props) {
  const { favorite, id, favoriteSearch, item, answer } = props;

  return (
    <div>
      <div className="prev-item">
        {favoriteSearch && favorite && (
          <div className="prev-answer-details">
            <img src={srcShare} alt="" />
            <div className="prev-item">{item}</div>
            <div className="your-answer">{answer} </div>
            <div className="most-ppl-answer">always</div>
          </div>
        )}
        {!favoriteSearch && (
          <div className="prev-answer-details">
            <img src={srcShare} alt="" />
            <div className="prev-item">{item} </div>
            <div className="your-answer">{answer} </div>
            <div className="most-ppl-answer">always</div>
          </div>
        )}
      </div>
    </div>
  );
}
