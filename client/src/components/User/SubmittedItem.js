import React from "react";
import { Link } from "react-router-dom";
import "./SubmittedItems.css";

export default function SubmittedItem(props) {
  const { id, item, approved, setCurrentItem, deleteItem, replied, topics } =
    props;

  let answers = props.answers ? " " + props.answers + " answers" : "";

  return approved ? (
    <div className="item-cont">
      <div className="item">
        <i class="fas fa-check"></i>&nbsp;&nbsp;
        <Link
          to="/itemShow"
          onClick={() =>
            setCurrentItem({
              id: id,
              item: item,
              topic: topics,
              replied: replied,
            })
          }
        >
          {item}
          {topics}
        </Link>
      </div>
      <div className="item-info">
        <div className="item-info-id">Approved</div>
        <div className="item-info-id">
          &nbsp;&nbsp;
          <i onClick={() => deleteItem(id)} className="fas fa-minus-circle"></i>
        </div>
      </div>
    </div>
  ) : (
    <div className="item-cont">
      <div className="item">
        <i class="fas fa-spinner"></i>&nbsp;&nbsp;
        {item} {"  "}#{topics}
      </div>
      <div className="item-info">
        <div className="item-info-id">Waiting...</div>
        <div className="item-info-id">
          &nbsp;&nbsp;
          <i onClick={() => deleteItem(id)} className="fas fa-minus-circle"></i>
        </div>
      </div>
    </div>
  );
}
