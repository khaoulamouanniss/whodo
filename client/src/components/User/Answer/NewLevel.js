import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import "./Answer.css";
import User from "../../Admin/User";

export default function NewLevel(props) {
  console.log("props of newLevel", props);
  //1:bring the topics unlocked
  //2:show the user the level he locked
  //3:enable the user to start answering new items of unlocked topics
  let { unlockedTopics } = props;

  const [score, setScore] = useState(localStorage.getItem("userScore"));
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState(localStorage.getItem("userLevel"));
  const [pointsToNext, setPointsToNext] = useState(0);

  //returns the number of marks missing to go to next level
  useEffect(() => {
    const levels = [500, 410, 330, 230, 200, 150, 110, 50, 30];
    for (let counter = 0; counter < levels.length - 1; counter++) {
      if (score <= levels[counter] && score > levels[counter + 1]) {
        setPointsToNext(Number(levels[counter] - score));
        break;
      }
    }
    if (score < 30) {
      setPointsToNext(30 - score);
    }
  }, []);

  //getting a random item according to a random topic
  const randomItem = () => {
    const myTopic =
      unlockedTopics[Math.floor(Math.random() * unlockedTopics.length)];
    axios
      .post("http://localhost:8001/answer/random", {
        id: props.user.id,
        topic: myTopic,
      })
      .then((res) => {
        props.setCurrentItem(res.data);
        setTopic(myTopic);
        return res.data;
      });
  };

  return (
    <div className="div-container">
      <div className="yourScore"></div>
      <div className="newLevel">
        {/*first component of our flexBox*/}
        <h4>Points : {score}</h4>
        <h3 className="capitalize">You have unlocked</h3>
        <h1 className="capitalize orangeText">level {level}</h1>
        <h6>{pointsToNext} points to pass</h6>
        <h3> New topics</h3>
        <div className="orangeText">
          {unlockedTopics &&
            unlockedTopics.map((item) => {
              return (
                <h4>
                  <div> #{item}</div>
                </h4>
              );
            })}
        </div>
        <Link
          style={{ textDecoration: "none" }}
          to="/answer"
          onClick={randomItem}
        >
          <button className="skip">
            Next
            <i className="fas fa-angle-right" style={{ fontSize: "36px" }}></i>
          </button>
        </Link>
      </div>
    </div>
  );
}
