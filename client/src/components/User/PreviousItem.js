import React, { useEffect, useState } from "react";
import * as FcIcons from "react-icons/fc";
import axios from "axios";
import "./PreviousItems.css";
import srcShare from "../images/Share_Active.png";

export default function PreviousItem(props) {
  const { favorite, id, favoriteSearch, item, answer } = props;
  const [mostPeople, setMostPeople] = useState("");
  //returns the index of the max element in an array
  const indexOfMax = (arr) => {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  };
  useEffect(() => {
    props.getNbAnsByOption(item).then((data) => {
      let tempOptionValues = [];
      data.map((i) => {
        tempOptionValues.push(Number(i.nbanswers));
      });
      console.log("max hne", indexOfMax(tempOptionValues));
      switch (indexOfMax(tempOptionValues)) {
        case 0:
          setMostPeople("Never");
          break;
        case 1:
          setMostPeople("Rarely");
          break;
        case 2:
          setMostPeople("Sometimes");
          break;
        case 3:
          setMostPeople("Usually");
          break;
        case 4:
          setMostPeople("Always");
          break;
        default:
          setMostPeople("error");
          break;
      }
    });
  }, []);

  return (
    <div>
      <div className="prev-item">
        {favoriteSearch && favorite && (
          <div className="prev-answer-details">
            <img
              src={srcShare}
              alt=""
              style={{ height: "25px", width: "25px", margin: "auto" }}
            />
            <div className="prev-item">{item}</div>
            <div className="your-answer">{answer} </div>
            <div className="most-ppl-answer">always</div>
          </div>
        )}
        {!favoriteSearch && (
          <div className="prev-answer-details">
            <img
              src={srcShare}
              alt=""
              style={{ height: "25px", width: "25px", margin: "auto" }}
            />
            <div className="prev-item">{item} </div>
            <div className="your-answer">{answer} </div>
            <div className="most-ppl-answer">{mostPeople}</div>
          </div>
        )}
      </div>
    </div>
  );
}
