import React, { useState, useEffect } from "react";

import PreviousItem from "./PreviousItem";
import "./PreviousItems.css";

export default function PreviousItems(props) {
  const [favoriteSearch, setFavoriteSearch] = useState(false);

  const itemData = props.items.map((i) => (
    <PreviousItem
      id={i.id}
      item={i.item}
      answer={i.user_answer}
      favorite={i.favorite}
      favoriteSearch={favoriteSearch}
    />
  ));

  return (
    <div className="previousContainer">
      <div className="page-title-items">Items</div>
      <div className="search-bar">
        <div className="search-input">
          <input
            type="text"
            className="inputSearch"
            onKeyUp={(e) => props.setHandleSearch(e.target.value)}
          />
        </div>
        <div className="like">
          <i
            class="fas fa-heart"
            style={{ color: favoriteSearch ? "red" : "black" }}
            onClick={() => setFavoriteSearch(!favoriteSearch)}
          ></i>
        </div>
      </div>

      <div className="prev-answer-details-title">
        <div className="prev-item-title"> item </div>
        <div className="your-answer-title">You </div>
        <div className="most-ppl-answer-title">They answer</div>
      </div>
      {itemData}
    </div>
  );
}
