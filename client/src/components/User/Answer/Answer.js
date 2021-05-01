import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Answer.css";

export default function Answer(props) {
  let item_id = props.item.id;
  let user_id = props.user.id;
  const [currentStep, setCurrentStep] = useState(1);
  const [topic, setTopic] = useState(props.item.topic);

  const [voteOption, setVoteOption] = useState(0);
  const [showValues, setShowValues] = useState(false);

  //tell about the page state
  //1:see the question and click on the option we chose
  //2:sending my choice to the database to be stored
  //3:disabling the buttons after voting

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
            setVoteOption(id);
            addAnswer(id);

            alert(
              "thank you for your response, now you can guess and get points"
            );
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
        {/*second component of our flexBox*/}
        <div className="voteButtons">
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
            nameButton={"Sometimes"}
            className="ans-btn trigger"
          />
        </div>
        {/*<h3> {guessAnswer}</h3>*/}
      </div>
    </div>
  );
}
