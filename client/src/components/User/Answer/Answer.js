import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Answer.css";

export default function Answer(props) {
  console.log("props de answer", props);
  let item_id = props.item.id;
  let user_id = props.user.id;

  const [topic, setTopic] = useState(props.item.topic);
  const [topics, setTopics] = useState([]);
  const [voteOption, setVoteOption] = useState(0);
  const [showValues, setShowValues] = useState(false);

  //tell about the page state
  //1:see the question and click on the option we chose
  //2:sending my choice to the database to be stored
  //3:disabling the buttons after voting

  useEffect(() => {
    let temporaryArray = [];
    props.topics.map((topic) => {
      console.log(topic.topic);
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

  //getting the number of answers for each option from the database when the page load
  useEffect(() => {
    if (voteOption) {
      document.getElementById(`id${voteOption}`).style.backgroundColor =
        "orange";
    }
  }, [voteOption]);
  //function responsible of adding a new response to answer_items table
  const addAnswer = (voteOption) => {
    axios
      .post("http://localhost:8001/answer/add", {
        user_id: user_id,
        answer: voteOption,
        item_id: item_id,
      })
      .then((res) => {
        console.log("shoufou resultat", res.data);
        return res.data;
      });
  };

  //creating a component for the button to be called
  const ButtonForAnswer = ({ id, nameButton, percentage }) => {
    return (
      <div className={`graph${id}`}>
        <button
          name={nameButton}
          id={`id${id}`}
          className="ans-btn trigger"
          onClick={(e) => {
            e.preventDefault();
            localStorage.setItem("clicked", true);
            setVoteOption(id);
            addAnswer(id);
          }}
          disabled={voteOption ? true : false}
        >
          {" "}
          {showValues ? `${percentage[{ id }]}%` : ""}{" "}
        </button>
        <div className="hidden">
          <p> {nameButton}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="div-container">
      {/*first component of our flexBox*/}

      <div className="yourScore"> Points : {}</div>
      {/*second component of our flexBox*/}
      <div className="itemAndButtons">
        <div className="itemHashtag">
          <div className="hashtag">
            <Link style={{ textDecoration: "none" }} to="/answer">
              <h5>#{topic}</h5>
            </Link>
          </div>
          <div className="itemContent">
            <h3>{props.item.item}</h3>
          </div>
        </div>
        {/*second component of the second component of our flexBox*/}
        <div className="buttonsAndLabel">
          <div className="youDo optionIndication">You do</div>
          <div className="voteButtons">
            <div className="optionIndication">Never</div>
            <ButtonForAnswer
              id={1}
              nameButton={"Never"}
              className="ans-btn trigger"
            />

            <ButtonForAnswer
              id={2}
              nameButton={"Rarely"}
              className="ans-btn trigger"
            />

            <ButtonForAnswer
              id={3}
              nameButton={"Sometimes"}
              className="ans-btn trigger"
            />

            <ButtonForAnswer
              id={4}
              nameButton={"Usually"}
              className="ans-btn trigger"
            />

            <ButtonForAnswer
              id={5}
              nameButton={"Always"}
              className="ans-btn trigger"
            />

            <div className="optionIndication">Always</div>
          </div>
          {/*voteButtons ended here*/}
        </div>
      </div>
      {!voteOption ? (
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
      ) : (
        <Link style={{ textDecoration: "none" }} to="/answerGuess">
          <button className="skip">
            Next
            <i className="fas fa-angle-right" style={{ fontSize: "36px" }}></i>
          </button>
        </Link>
      )}
    </div>
  );
}
