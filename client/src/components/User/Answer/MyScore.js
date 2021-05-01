import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Answer.css";
import AnswerGuess from "./AnswerGuess.js";
import "./MyScore.css";
export default function MyScore(props) {
  console.log("myscore props", props);
  //use a hook to bring all the answers with their scores in an array
  const [arrayOfScores, setArrayOfScores] = useState([]);
  const arrayOfGuesses = ["Never", "Rarely", "Sometimes", "Usually", "Always"];
  //get the answers with scores for a user
  const getAnswersWithScores = (user) => {
    return axios
      .post("http://localhost:8001/MyScore", { user: user })
      .then((res) => {
        console.log("res for get answers with scores", res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //useEffect to fill in the array whenever the page is loaded
  useEffect(() => {
    if (props.user) {
      console.log("inside the if");
      getAnswersWithScores(props.user.id).then((data) => {
        console.log("before setting the array");
        console.log(data);
        setArrayOfScores(data);
        console.log(arrayOfScores);
      });
    }
  }, []);

  return (
    <div className="score-container">
      {/*first component of our flexBox*/}
      <div className="score-title">
        <h1>check your score</h1>
        <div className="score-results">
          <table className="arrayScores">
            <tr>
              <td className="scoreItem header">Item</td>
              <td className="scoreItem header">Your response</td>
              <td className="scoreItem header">Score</td>
            </tr>
            {arrayOfScores.length ? (
              arrayOfScores.map((i) => {
                return (
                  <tr>
                    <td className="scoreItem">{i.item}</td>
                    <td className="scoreItem">{arrayOfGuesses[i.guess - 1]}</td>
                    <td className="scoreItem"> {i.points}</td>
                  </tr>
                );
              })
            ) : (
              <p>You haven't guessed yet</p>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
