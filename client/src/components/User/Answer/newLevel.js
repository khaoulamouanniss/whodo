import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import "./Answer.css";

export default function NewLevel(props) {
  //1:bring the topics unlocked
  //2:show the user the level he locked
  //3:enable the user to start answering new items of unlocked topics
  const [openedTopics, setOpenedTopics] = useState([]);
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState(1);
  const [topics, setTopics] = useState([]);
  let user_id = props.user.id;

  //getting the unlocked topics at the page load
  useEffect(() => {
    console.log(user_id);
    getUnlockedTopics();
    axios
      .post("http://localhost:8001/newLevel", {
        user: user_id,
      })
      .then((res) => {
        console.log("getting the level", res.data);
        setLevel(res.data);
        return res.data;
      });

    let temporaryArray = [];
    props.topics.map((topic) => {
      temporaryArray.push(topic.topic);
    });
    setTopics(temporaryArray);
  }, []);

  //getting a random item according to a random topic
  const randomItem = () => {
    axios
      .post("http://localhost:8001/answer/random", {
        topic: topics[Math.floor(Math.random() * topics.length)],
      })
      .then((res) => {
        props.setCurrentItem(res.data);
        setTopic(topics[Math.floor(Math.random() * topics.length)]);
        return res.data;
      });
  };

  //set the state openedTopics to all unlocked topics
  const getUnlockedTopics = () => {
    axios
      .post("http://localhost:8001/unlockedTopics", {
        user: user_id,
      })
      .then((res) => {
        console.log(res);
        setOpenedTopics(res.data);
        return res.data;
      });
  };

  return (
    <div className="div-container">
      <div className="yourScore"></div>
      <div className="itemAndButtons">
        {/*first component of our flexBox*/}

        <h3>You have unlocked</h3>
        <h1>level {props.level}</h1>
        <h6>{props.score} to pass</h6>
        <h3> Your newest topics</h3>

        {openedTopics &&
          openedTopics.map((item) => {
            return (
              <h4>
                <div> {item}</div>
              </h4>
            );
          })}

        <Link
          style={{ textDecoration: "none" }}
          to="/answer"
          onClick={randomItem}
        >
          <button className="skip">
            skip
            <i className="fas fa-angle-right" style={{ fontSize: "36px" }}></i>
          </button>
        </Link>
      </div>
    </div>
  );
}
