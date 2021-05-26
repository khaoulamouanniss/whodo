import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import "./Answer.css";

export default function NewLevel(props) {
  console.log(props);
  //1:bring the topics unlocked
  //2:show the user the level he locked
  //3:enable the user to start answering new items of unlocked topics
  const [openedTopics, setOpenedTopics] = useState([]);
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState(1);
  const [topics, setTopics] = useState([]);
  const [pointsToNext, setPointsToNext] = useState(0);
  let user_id = props.user.id;

  //getting the unlocked topics at the page load
  useEffect(() => {
    console.log(user_id);
    getUnlockedTopics(user_id);
    axios
      .post("http://localhost:8001/newLevel", {
        user: user_id,
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
    if (level === 1) {
      setPointsToNext(50 - Number(props.score));
    } else if (level === 2) {
      setPointsToNext(60 - Number(props.score));
    } else if (level === 3) {
      setPointsToNext(80 - Number(props.score));
    }
  }, []);

  //returns the number of marks missing to go to next level

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
    let unlocked = [];
    axios
      .post("http://localhost:8001/unlockedTopics", {
        user: user_id,
      })
      .then((res) => {
        res.data.map((topic) => {
          unlocked.push(topic.topic);
        });
        console.log(res);
        setOpenedTopics(unlocked);
        return res.data;
      });
  };

  return (
    <div className="div-container">
      <div className="yourScore"></div>
      <div className="itemAndButtons">
        {/*first component of our flexBox*/}

        <h3>You have unlocked</h3>
        <h1>level {level}</h1>
        <h6>
          {pointsToNext}
          to pass
        </h6>
        <h3> New topics</h3>

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
