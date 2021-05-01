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
  const [arrayHighest, setArrayHighest] = useState([]);
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
      console.log(optionValues);
    });
  }, []);
  //changing the height of each option according to its value brought from the database
  function changeheight() {
    document.getElementById("id1").style.height =
      (optionValues[0] * 4 + 20).toString() + "px";
    document.getElementById("id2").style.height =
      (optionValues[1] * 4 + 20).toString() + "px";
    document.getElementById("id3").style.height =
      (optionValues[2] * 4 + 20).toString() + "px";
    document.getElementById("id4").style.height =
      (optionValues[3] * 4 + 20).toString() + "px";
    document.getElementById("id5").style.height =
      (optionValues[4] * 4 + 20).toString() + "px";
  }

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

  //creating a component for the button to be called
  const ButtonForGuess = ({ id, nameButton, percentage, styleButton }) => {
    return (
      <div className={`graph${id}`}>
        <button
          name={nameButton}
          id={`id${id}`}
          className="ans-btn trigger"
          onClick={(e) => {
            e.preventDefault();
            setDidGuess(true);
            setGuessOption(id);
            updateAfterGuess(e);
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
    let guessAns = "";

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
    setArrayHighest(levels[0]);
    console.log(arrayHighest);

    console.log(levels);
    if (levels[0]) {
      if (
        (buttonId === "id1" && levels[0].includes(0)) ||
        (buttonId === "id2" && levels[0].includes(1)) ||
        (buttonId === "id3" && levels[0].includes(2)) ||
        (buttonId === "id4" && levels[0].includes(3)) ||
        (buttonId === "id5" && levels[0].includes(4))
      ) {
        addGuess(guessOption, 10, id);
        guessAns = "Perfect Guess, 10 marks added \n";
      }
    }
    if (levels[1]) {
      if (
        (buttonId === "id1" && levels[1].includes(0)) ||
        (buttonId === "id2" && levels[1].includes(1)) ||
        (buttonId === "id3" && levels[1].includes(2)) ||
        (buttonId === "id4" && levels[1].includes(3)) ||
        (buttonId === "id5" && levels[1].includes(4))
      ) {
        setPoints(5);
        addGuess(guessOption, 5, id);
        guessAns = "Almost there, 5 marks added \n";
      }
    }
    if (levels[2]) {
      if (
        (buttonId === "id1" && levels[2].includes(0)) ||
        (buttonId === "id2" && levels[2].includes(1)) ||
        (buttonId === "id3" && levels[2].includes(2)) ||
        (buttonId === "id4" && levels[2].includes(3)) ||
        (buttonId === "id5" && levels[2].includes(4))
      ) {
        setPoints(0);
        addGuess(guessOption, 0, id);
        guessAns = "No marks added \n";
      }
    }
    if (levels[3]) {
      if (
        (buttonId === "id1" && levels[3].includes(0)) ||
        (buttonId === "id2" && levels[3].includes(1)) ||
        (buttonId === "id3" && levels[3].includes(2)) ||
        (buttonId === "id4" && levels[3].includes(3)) ||
        (buttonId === "id5" && levels[3].includes(4))
      ) {
        setPoints(-5);
        addGuess(guessOption, -5, id);
        guessAns = "Second Farest answer, 5 marks deducted \n";
      }
    }
    if (levels[4]) {
      if (
        (buttonId === "id1" && levels[4].includes(0)) ||
        (buttonId === "id2" && levels[4].includes(1)) ||
        (buttonId === "id3" && levels[4].includes(2)) ||
        (buttonId === "id4" && levels[4].includes(3)) ||
        (buttonId === "id5" && levels[4].includes(4))
      ) {
        setPoints(-10);
        addGuess(guessOption, -10, id);
        guessAns = "Farest answer, 10 marks deducted \n";
      }
    }
    guessAns += "\n ";
    guessAns += "Most people answered";
    for (const c in arrayHighest) {
      console.log(arrayHighest[c], c, arrayHighest.length);
      if (arrayHighest[c] === 0) {
        guessAns += " Never ";
      }
      if (arrayHighest[c] === 1) {
        guessAns += " Rarely ";
      }
      if (arrayHighest[c] === 2) {
        guessAns += " Sometimes ";
      }
      if (arrayHighest[c] === 3) {
        guessAns += "Usually";
      }
      if (arrayHighest[c] === 4) {
        guessAns += "Always";
      }
    }
    setGuessAnswer(guessAns);
    if (guessAnswer) {
      alert(guessAnswer);
    }
    changeheight();
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
      <div className="itemAndButtons">
        <div className="itemHashtag">
          <h3>Guess what most people do second page???</h3>
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
          <ButtonForGuess
            id={1}
            nameButton={"Never"}
            percentage={Math.round((optionValues[id] / total) * 100)}
            styleButton={{
              height: `${Math.round((optionValues[id] / total) * 100)} px`,
            }}
            className="ans-btn trigger"
          />

          <ButtonForGuess
            id={2}
            nameButton={"Rarely"}
            percentage={Math.round((optionValues[id] / total) * 100)}
            styleButton={{
              height: `${Math.round((optionValues[id] / total) * 100)} px`,
            }}
            className="ans-btn trigger"
          />

          <ButtonForGuess
            id={3}
            nameButton={"Sometimes"}
            percentage={Math.round((optionValues[id] / total) * 100)}
            styleButton={{
              height: `${Math.round((optionValues[id] / total) * 100)} px`,
            }}
            className="ans-btn trigger"
          />

          <ButtonForGuess
            id={4}
            nameButton={"Usually"}
            percentage={Math.round((optionValues[id] / total) * 100)}
            styleButton={{
              height: `${Math.round((optionValues[id] / total) * 100)} px`,
            }}
            className="ans-btn trigger"
          />

          <ButtonForGuess
            id={5}
            nameButton={"Sometimes"}
            percentage={Math.round((optionValues[id] / total) * 100)}
            styleButton={{
              height: `${Math.round((optionValues[id] / total) * 100)} px`,
            }}
            className="ans-btn trigger"
          />
        </div>
        {/*<h3> {guessAnswer}</h3>*/}
      </div>
    </div>
  );
}
