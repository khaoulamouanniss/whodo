import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import "./Answer.css";

export default function NewLevel(props) {
  //1:bring the topics unlocked
  //2:show the user the level he locked
  //3:enable the user to start answering new items of unlocked topics
  const [openedTopics, setOpenedTopics] = useState([]);
  const [score, setScore] = useState(0);
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState(localStorage.getItem("userLevel"));
  const [topics, setTopics] = useState([]);
  const [pointsToNext, setPointsToNext] = useState(0);
  let user_id = props.user.id;

  //getting the score of the user
  useEffect(() => {
    axios
      .post("http://localhost:8001/guess/score", {
        user: user_id,
      })
      .then((res) => {
        console.log("getting the scores", res.data);
        setScore(res.data);
        const levels = [500, 410, 330, 230, 200, 150, 110, 50, 30];
        for (let counter = 0; counter < levels.length - 1; counter++) {
          if (res.data <= levels[counter] && res.data > levels[counter + 1]) {
            setPointsToNext(Number(levels[counter] - res.data));
            break;
          }
        }
        if (res.data < 30) {
          setPointsToNext(30 - res.data);
        }
      });
  }, []);
  //getting the unlocked topics at the page load
  useEffect(() => {
    console.log(level);
    getUnlockedTopics(level);
    axios
      .post("http://localhost:8001/newLevel", {
        level: level,
      })
      .then((res) => {
        console.log("getting the level", res);
        setLevel(res.data);
        return res.data;
      });

    let temporaryArray = [];
    props.topics.map((topic) => {
      console.log(topic);
      temporaryArray.push(topic.topic);
    });
    console.log(temporaryArray);
    setTopics(temporaryArray);
  }, []);

  //returns the number of marks missing to go to next level

  //getting a random item according to a random topic
  const randomItem = () => {
    axios
      .post("http://localhost:8001/answer/random", {
        topic: openedTopics[Math.floor(Math.random() * openedTopics.length)],
      })
      .then((res) => {
        console.log("besh ntalla3 winou topic", res.data);
        props.setCurrentItem(res.data);
        setTopic(res.data.topic);
        return res.data;
      });
  };

  //set the state openedTopics to all unlocked topics
  const getUnlockedTopics = (level) => {
    let unlocked = [];
    axios
      .post("http://localhost:8001/unlockedTopics", {
        level: level,
      })
      .then((res) => {
        res.data.map((topic) => {
          unlocked.push(topic.topic);
        });
        console.log(res);
        setOpenedTopics(unlocked);
        return openedTopics;
      });
  };

  return (
    <div className="div-container">
      <div className="yourScore"></div>
      <div className="newLevel">
        {/*first component of our flexBox*/}
        <h4>Points : {score}</h4>
        <h3 className="capitalize">You have unlocked</h3>
        <h1 className="capitalize orangeText">
          level {localStorage.getItem("userLevel")}
        </h1>
        <h6>{pointsToNext} points to pass</h6>
        <h3> New topics</h3>
        <div className="orangeText">
          {openedTopics &&
            openedTopics.map((item) => {
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
