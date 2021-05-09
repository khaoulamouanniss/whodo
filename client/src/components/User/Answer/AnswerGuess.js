import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Answer.css";

export default function AnswerGuess(props) {
  let id = props.item.id;
  let user_id = props.user.id;
  const [currentStep, setCurrentStep] = useState(1);
  const [topic, setTopic] = useState(props.item.topic);
  const [optionValues, setOptionValues] = useState([0, 0, 0, 0, 0]);
  const [guessOption, setGuessOption] = useState(0);
  const [showValues, setShowValues] = useState(false);
  const [total, setTotal] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [points, setPoints] = useState(0);
  const [guessAnswer, setGuessAnswer] = useState("");

  const [didGuess, setDidGuess] = useState(false);

  //tell about the page state
  //1:see the question and click my guess
  //2:calculating the score I got for my guess
  //3:sending my guess and the score to the server
  //4:getting all the responses
  //5:visualizing all the responses

  //getting the number of answers for each option from the database when the page load
  useEffect(() => {
    props.getNbAnsByOption(props.item.item).then((data) => {
      let tempOptionValues = [];
      data.map((i) => {
        tempOptionValues.push(Number(i.nbanswers));
      });
      setTotal(tempOptionValues.reduce((a, b) => a + b));
      if (total) alert(total);
      setOptionValues(tempOptionValues);
    });
  }, []);

  //change the heights of the buttons according to the value in the database
  useEffect(() => {
    optionValues.map((i) => {});
    document.getElementById("id1").style.height =
      (Math.round((optionValues[0] / total) * 100) * 4 + 20).toString() + "px";
    document.getElementById("id2").style.height =
      (Math.round((optionValues[1] / total) * 100) * 4 + 20).toString() + "px";
    document.getElementById("id3").style.height =
      (Math.round((optionValues[2] / total) * 100) * 4 + 20).toString() + "px";
    document.getElementById("id4").style.height =
      (Math.round((optionValues[3] / total) * 100) * 4 + 20).toString() + "px";
    document.getElementById("id5").style.height =
      (Math.round((optionValues[4] / total) * 100) * 4 + 20).toString() + "px";
  }, [guessAnswer]);

  //returns the maximum value in an array of objects
  function maxOfArray(arr) {
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
      console.log("bonjour from for");
      if (max < arr[i]) {
        console.log("bonjour from if");
        max = arr[i];
      }
    }
    return max;
  }

  //getting the message that assess our guess
  function getGuessAssessment(levels, choice) {
    let guessAns = "";
    console.log(levels);
    console.log(choice);
    if (levels[0].includes(choice)) {
      console.log("donno why the message isnt showing");
      guessAns += "Perfect Guess, 10 marks added \n";
      addGuess(choice, 10, id);
    } else if (levels[1].includes(choice)) {
      console.log("donno why the message isnt showing");
      guessAns += "Almost there, 5 marks added \n";
      setPoints(5);
      addGuess(choice, 5, id);
    } else if (levels[2].includes(choice)) {
      console.log("donno why the message isnt showing");
      guessAns += "No marks added \n";
      setPoints(0);
      addGuess(choice, 0, id);
    } else if (levels[3].includes(choice)) {
      console.log("donno why the message isnt showing");
      guessAns += "Second Farest answer, 5 marks deducted \n";
      setPoints(-5);
      addGuess(choice, -5, id);
    } else if (levels[4].includes(choice)) {
      console.log("donno why the message isnt showing");
      guessAns += "Farest answer, 10 marks deducted \n";
      setPoints(-10);
      addGuess(choice, -10, id);
    }
    guessAns += " Most people answered ";
    levels[0].map((el) => {
      switch (el) {
        case 0:
          guessAns += "Never ";
          break;
        case 1:
          guessAns += "Rarely ";
          break;
        case 2:
          guessAns += "Sometimes ";
          break;
        case 3:
          guessAns += "Usually ";
          break;
        case 4:
          guessAns += "Always ";
          break;
      }
    });

    return guessAns;
  }

  //creating a component for the button to be called
  const ButtonForGuess = ({ id, nameButton, percentage, styleButton }) => {
    return (
      <div className={`graph${id}`}>
        <button
          name={nameButton}
          id={`id${id}`}
          className="ans-btn trigger"
          onClick={(e) => {
            setGuessOption(id);
            setDidGuess(true);
            e.target.style = { styleButton };
          }}
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

  //the event to be triggered when the user click on a button to guess
  const updateAfterGuess = (e) => {
    const buttonId = e.target.id;
    let valueGuess;
    switch (buttonId) {
      case "id1":
        valueGuess = 1;
        break;
      case "id2":
        valueGuess = 2;
        break;
      case "id3":
        valueGuess = 3;
        break;
      case "id4":
        valueGuess = 4;
        break;
      case "id5":
        valueGuess = 5;
        break;
    }
    /* a table that contains an array of arrays ordered from higher answers to lower answer, in each cell more 
than one element because we can have same number of answers for different options */
    let levels = [];
    e.target.style = { height: `{ percentage } px` };
    //counter on the number of cells in each subArray
    let levelsCounter = 0;
    //counter on how many array in the matrix
    let l = 0;
    //initialiaze the array of level(array of arrays): index 0 contains the highest rates and  5 for lowest rates
    for (let c = 0; c < 5; c++) {
      levels[c] = [];
    }

    //make a copy of the nb of answers for each option
    let copyOptionValues = [...optionValues];
    console.log(copyOptionValues);
    //we may fill into one level three option when users answer 4 answers for example for never, rarely, usually
    while (levelsCounter < 5) {
      let max = maxOfArray(copyOptionValues);
      console.log(max);
      for (let i = 0; i < copyOptionValues.length; i++) {
        if (copyOptionValues[i] === max) {
          //storing in each sub array of optionValues the index of options having the highest rate
          levels[l].push(i);
          levelsCounter++;
          copyOptionValues[i] = -1;
        }
      }
      l++;
    }

    console.log(levels);

    console.log(valueGuess);

    setGuessAnswer(getGuessAssessment(levels, valueGuess - 1));
    if (guessAnswer) {
      console.log(guessAnswer);
    }
  };
  //on clicking on the guess button, you will execute this function that'll add your guess to the database
  const addGuess = (guessOption, points, id) => {
    axios
      .post("http://localhost:8001/guess/add", {
        user_id: user_id,
        guess: guessOption,
        item_id: id,
        points: points,
      })
      .then((res) => {
        console.log("result of adding a guess", res.data);
        return res.data;
      });
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
            <h3>
              {props.item.item.replace("your", "their").replace("you", "they")}
            </h3>
          </div>
        </div>
        {/*second component of our flexBox*/}
        <div className="buttonsAndLabel">
          <div className="youDo optionIndication">Most people do</div>
          <div className="voteButtons">
            <div className="optionIndication">Never</div>
            <ButtonForGuess
              id={1}
              nameButton={"Never"}
              className="ans-btn trigger"
            />

            <ButtonForGuess
              id={2}
              nameButton={"Rarely"}
              className="ans-btn trigger"
            />

            <ButtonForGuess
              id={3}
              nameButton={"Sometimes"}
              className="ans-btn trigger"
            />

            <ButtonForGuess
              id={4}
              nameButton={"Usually"}
              className="ans-btn trigger"
            />

            <ButtonForGuess
              id={5}
              nameButton={"Always"}
              className="ans-btn trigger"
            />

            <div className="optionIndication">Always</div>
          </div>
          {/*voteButtons ended here*/}
        </div>
        {showAlert && (
          <div className="Absolute-Center">
            <div className="points">{points}</div>
          </div>
        )}
      </div>
      {didGuess && (
        <button
          className="skip"
          onClick={(e) => {
            updateAfterGuess(e);
            setShowAlert(true);
          }}
        >
          Done
          <i className="fas fa-angle-right" style={{ fontSize: "36px" }}></i>
        </button>
      )}
    </div>
  );
}
