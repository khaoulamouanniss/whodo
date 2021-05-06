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
      getAnswersWithScores(props.user.id).then((data) => {
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
        <h1
          style={{
            textAlign: "center",
            margin: "30px",
            fontFamily: "serif",
            color: "orangered",
            padding: "20px",
          }}
        >
          check your score
        </h1>
        <div className="score-results">
          <table className="arrayScores">
            <tr>
              <td
                className="scoreItem header"
                style={{
                  textAlign: "center",
                  fontSize: "Bold",
                  fontFamily: "serif",
                  color: "orangered",
                }}
              >
                Item
              </td>
              <td
                className="scoreItem header"
                style={{
                  textAlign: "center",
                  fontSize: "Bold",
                  fontFamily: "serif",
                  color: "orangered",
                }}
              >
                Your response
              </td>
              <td
                className="scoreItem header"
                style={{
                  textAlign: "center",
                  fontSize: "Bold",
                  fontFamily: "serif",
                  color: "orangered",
                }}
              >
                Score
              </td>
            </tr>
            {arrayOfScores.length > 0 &&
              arrayOfScores.map((i) => {
                return (
                  <tr>
                    <td
                      className="scoreItem"
                      style={{
                        fontFamily: "serif",
                      }}
                    >
                      {i.item}
                    </td>
                    <td
                      className="scoreItem"
                      style={{
                        fontFamily: "serif",
                      }}
                    >
                      {arrayOfGuesses[i.guess]}
                    </td>
                    <td
                      className="scoreItem"
                      style={{
                        fontFamily: "serif",
                      }}
                    >
                      {" "}
                      {i.points}
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}
